import { httpTransport } from '#Infrastructure/fastify';
import db from '#Infrastructure/sequelize';
import { UnauthorizedError, NotFoundError } from '#Lib/errors';
import { find as findClient } from '#App/clients/repositories/find';
import { get as getShop } from '#App/shops/repositories/get';
import { bulkCreate as bulkCreateProducts } from '../repositories/bulkCreate';
import { BulkCreateProductsSchema } from '../schemas/bulkCreate';

httpTransport.handler.post(
  '/api/clients/v1/products',
  BulkCreateProductsSchema,
  async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedError('API key is required');
    }

    const client = await findClient({ apiKey });

    const { products: productsData } = request.payload;

    const result = await db.runInTransaction(async (transaction) => {
      const repOptions = { transaction };

      const productsToCreate = [];

      for (const productData of productsData) {
        const shop = await getShop({ guid: productData.shopGuid }, repOptions);

        if (!shop || shop.clientGuid !== client.guid) {
          throw new NotFoundError('Shop', { guid: productData.shopGuid });
        }

        productsToCreate.push({
          shopGuid: productData.shopGuid,
          name: productData.name,
          price: productData.price,
          quantity: productData.quantity || 0,
        });
      }

      const products = await bulkCreateProducts(productsToCreate, repOptions);

      return products;
    });

    return { data: { products: result, count: result.length } };
  },
);
