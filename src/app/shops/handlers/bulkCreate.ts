import { httpTransport } from '#Infrastructure/fastify';
import { BulkCreateShopsSchema } from '../schemas/bulkCreate';
import { bulkCreate as bulkCreateShops } from '../repositories/bulkCreate';
import { find as findClient } from '#App/clients/repositories/find';
import { UnauthorizedError } from '#Lib/errors';

httpTransport.handler.post('/api/clients/v1/shops/bulk', BulkCreateShopsSchema, async (request) => {
  const apiKey = request.headers['x-api-key'] as string;

  if (!apiKey) {
    throw new UnauthorizedError('API key is required');
  }

  const client = await findClient({ apiKey });

  const { shops: shopsData } = request.payload;

  const shopsToCreate = shopsData.map((shop) => ({
    clientGuid: client.guid,
    name: shop.name,
    address: shop.address,
    city: shop.city,
    region: shop.region,
    schedule: shop.schedule || null,
  }));

  const shops = await bulkCreateShops(shopsToCreate);

  return { data: { shops, count: shops.length } };
}, { authOnly: false });
