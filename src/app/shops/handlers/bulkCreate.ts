import { httpTransport } from '#Infrastructure/fastify';
import { BulkCreateShopsSchema } from '../schemas/bulkCreate';
import { bulkCreate as bulkCreateShops } from '../repositories/bulkCreate';
import { ShopSchedule } from '../models/shop.model';
import { find as findClient } from '#App/clients/repositories/find';
import { UnauthorizedError } from '#Lib/errors';
import { ROLES } from '#Shared/roles';

httpTransport.handler.post('/api/clients/v1/shops', BulkCreateShopsSchema, async (request) => {
  const apiKey = request.headers['x-api-key'] as string;

  if (!apiKey) {
    throw new UnauthorizedError('API key is required');
  }

  const client = await findClient({ apiKey });

  const user = request.context.user!;

  const userRoles = (user as any).roles || [];
  const isClientAdmin = userRoles.some((role: any) => role.keyWord === ROLES.CLIENT_ADMIN.keyWord);

  if (!isClientAdmin) {
    throw new UnauthorizedError('Only organization administrators can create shops');
  }

  if (user.clientGuid !== client.guid) {
    throw new UnauthorizedError('User does not belong to this organization');
  }

  const { shops: shopsData } = request.payload;

  const shopsToCreate = shopsData.map((shop) => ({
    clientGuid: client.guid,
    name: shop.name,
    address: shop.address,
    city: shop.city,
    region: shop.region,
    schedule: (shop.schedule as ShopSchedule) || null,
  }));

  const shops = await bulkCreateShops(shopsToCreate);

  return { data: { shops, count: shops.length } };
});
