import { httpTransport } from '#Infrastructure/fastify';
import db from '#Infrastructure/sequelize';
import { EntityAlreadyExistedError } from '#Lib/errors';
import { generateApiKey } from '#Shared/apiKey';
import { ROLES } from '#Shared/roles';
import { bulkCreate as bulkCreateUserRoles } from '#App/userRoles/repositories/bulkCreate';
import { create as createClient } from '../repositories/create';
import { get as getClient } from '../repositories/get';
import { RegisterClientSchema } from '../schemas/register';

httpTransport.handler.post('/api/clients/v1/register', RegisterClientSchema, async (request) => {
  const { name } = request.payload;

  const existingClient = await getClient({ name });
  if (existingClient) {
    throw new EntityAlreadyExistedError('Client', { name });
  }

  const result = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction };

    const client = await createClient({
      name,
      apiKey: generateApiKey(),
    }, repOptions);

    await bulkCreateUserRoles([
      {
        name: ROLES.CLIENT_ADMIN.name,
        keyWord: ROLES.CLIENT_ADMIN.keyWord,
        clientGuid: client.guid,
      },
      {
        name: ROLES.SHOP_ADMIN.name,
        keyWord: ROLES.SHOP_ADMIN.keyWord,
        clientGuid: client.guid,
      },
    ], repOptions);

    return client;
  });

  return { data: { client: result } };
}, { authOnly: false });
