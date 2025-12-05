import { httpTransport } from '#Infrastructure/fastify';
import { BulkCreateShopAdministratorsSchema } from '../schemas/bulkCreate';
import { create as createUser } from '#App/users/repositories/create';
import { bulkCreate as bulkCreateShopAdministrators } from '../repositories/bulkCreate';
import { get as getShop } from '#App/shops/repositories/get';
import { find as findClient } from '#App/clients/repositories/find';
import { hashPassword } from '#Shared/password';
import { UnauthorizedError, NotFoundError } from '#Lib/errors';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post(
  '/api/clients/v1/shop-administrators/bulk',
  BulkCreateShopAdministratorsSchema,
  async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedError('API key is required');
    }

    const client = await findClient({ apiKey });

    const { administrators: administratorsData } = request.payload;

    const result = await db.runInTransaction(async (transaction) => {
      const repOptions = { transaction };

      const administrators = [];

      for (const adminData of administratorsData) {
        const shop = await getShop({ guid: adminData.shopGuid }, repOptions);

        if (!shop || shop.clientGuid !== client.guid) {
          throw new NotFoundError('Shop', { guid: adminData.shopGuid });
        }

        const hashedPassword = await hashPassword(adminData.password);

        const user = await createUser(
          {
            email: adminData.email,
            password: hashedPassword,
            firstName: adminData.firstName,
            lastName: adminData.lastName || null,
            patronymicName: adminData.patronymicName || null,
            phone: adminData.phone || null,
            country: adminData.country || null,
            age: adminData.age || null,
            clientId: client.id,
          },
          repOptions,
        );

        const shopAdmin = await bulkCreateShopAdministrators(
          [
            {
              shopGuid: adminData.shopGuid,
              userGuid: user.guid,
            },
          ],
          repOptions,
        );

        administrators.push({
          shopGuid: shopAdmin[0].shopGuid,
          userGuid: shopAdmin[0].userGuid,
          user: {
            guid: user.guid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            patronymicName: user.patronymicName,
            phone: user.phone,
            country: user.country,
            age: user.age,
          },
        });
      }

      return administrators;
    });

    return { data: { administrators: result, count: result.length } };
  },
  { authOnly: false },
);
