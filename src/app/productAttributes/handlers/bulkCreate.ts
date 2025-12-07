import { httpTransport } from '#Infrastructure/fastify';
import { BulkCreateProductAttributesSchema } from '../schemas/bulkCreate';
import { bulkCreate as bulkCreateProductAttributes } from '../repositories/bulkCreate';
import { ProductAttributeCreationAttributes } from '../models/productAttribute.model';
import { get as getProduct } from '#App/products/repositories/get';
import { get as getShop } from '#App/shops/repositories/get';
import { find as findClient } from '#App/clients/repositories/find';
import { UnauthorizedError, NotFoundError } from '#Lib/errors';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post(
  '/api/clients/v1/productAttributes',
  BulkCreateProductAttributesSchema,
  async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedError('API key is required');
    }

    const client = await findClient({ apiKey });

    const { productAttributes: productAttributesData } = request.payload;

    const result = await db.runInTransaction(async (transaction) => {
      const repOptions = { transaction };

      const attributesToCreate: ProductAttributeCreationAttributes[] = [];

      for (const attributeData of productAttributesData) {
        const product = await getProduct({ guid: attributeData.productGuid }, repOptions);

        if (!product) {
          throw new NotFoundError('Product', { guid: attributeData.productGuid });
        }

        const shop = await getShop({ guid: product.shopGuid }, repOptions);

        if (!shop || shop.clientGuid !== client.guid) {
          throw new NotFoundError('Product', { guid: attributeData.productGuid });
        }

        attributesToCreate.push({
          productGuid: attributeData.productGuid,
          type: attributeData.type as any,
          value: attributeData.value as any,
        });
      }

      const productAttributes = await bulkCreateProductAttributes(attributesToCreate, repOptions);

      return productAttributes;
    });

    return { data: { productAttributes: result, count: result.length } };
  },
);
