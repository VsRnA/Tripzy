import { httpTransport } from '#Infrastructure/fastify';
import { GetRecommendationsSchema } from '../schemas/getRecommendations';
import { list } from '../repositories/list';
import { calculateProductWeight } from '../services/calculateProductWeight';
import { find as findWaypoint } from '#App/tripWaypoints/repositories/find';

httpTransport.handler.get(
  '/api/products/v1/recommendations',
  GetRecommendationsSchema,
  async (request) => {
    const { tags, craftTypes, materials, region, city, waypointGuid, radius } = request.query;

    let waypointCoordinates = undefined;
    if (waypointGuid) {
      const waypoint = await findWaypoint({ guid: waypointGuid });
      waypointCoordinates = {
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
      };
    }

    const products = await list({
      region,
      city,
      removalMark: false,
      inStock: true,
      waypointCoordinates,
      radius,
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
