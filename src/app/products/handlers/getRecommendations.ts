import { httpTransport } from '#Infrastructure/fastify';
import { GetRecommendationsSchema } from '../schemas/getRecommendations';
import { list } from '../repositories/list';
import { calculateProductWeight } from '../services/calculateProductWeight';

httpTransport.handler.get(
  '/api/products/v1/recommendations',
  GetRecommendationsSchema,
  async (request) => {
    const { tags, craftTypes, materials, region, city, shopGuids } = request.query;

    const products = await list({
      region,
      city,
      shopGuids,
      removalMark: false,
      inStock: true,
    });

    const productsWithWeight = products.map((product) => {
      const productData = product.toJSON() as any;
      const attributes = productData.attributes || [];

      const weight = calculateProductWeight(attributes, {
        tags,
        craftTypes,
        materials,
      });

      return {
        product: productData,
        weight,
      };
    });

    productsWithWeight.sort((a, b) => b.weight - a.weight);

    const sortedProducts = productsWithWeight.map((item) => item.product);

    return {
      data: sortedProducts,
    };
  },
);
