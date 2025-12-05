import { httpTransport } from '#Infrastructure/fastify';
import { BulkCreateProductTagsSchema } from '../schemas/bulkCreate';
import { bulkCreate as bulkCreateProductTags } from '../repositories/bulkCreate';
import { get as getProduct } from '#App/products/repositories/get';
import { get as getShop } from '#App/shops/repositories/get';
import { find as findClient } from '#App/clients/repositories/find';
import { UnauthorizedError, NotFoundError } from '#Lib/errors';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post(
  '/api/clients/v1/product-tags/bulk',
  BulkCreateProductTagsSchema,
  async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedError('API key is required');
    }

    const client = await findClient({ apiKey });

    const { productTags: productTagsData } = request.payload;

    const result = await db.runInTransaction(async (transaction) => {
      const repOptions = { transaction };

      const tagsToCreate = [];

      for (const tagData of productTagsData) {
        const product = await getProduct({ guid: tagData.productGuid }, repOptions);

        if (!product) {
          throw new NotFoundError('Product', { guid: tagData.productGuid });
        }

        const shop = await getShop({ guid: product.shopGuid }, repOptions);

        if (!shop || shop.clientGuid !== client.guid) {
          throw new NotFoundError('Product', { guid: tagData.productGuid });
        }

        tagsToCreate.push({
          productGuid: tagData.productGuid,
          tag: tagData.tag,
        });
      }

      const productTags = await bulkCreateProductTags(tagsToCreate, repOptions);

      return productTags;
    });

    return { data: { productTags: result, count: result.length } };
  },
  { authOnly: false },
);
