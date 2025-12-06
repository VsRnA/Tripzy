import { httpTransport } from '#Infrastructure/fastify';
import { ListShopsSchema } from '../schemas/list';
import { list as listShops } from '../repositories/list';

httpTransport.handler.get('/api/clients/v1/shop/list', ListShopsSchema, async (request) => {
  const { latitude, longitude, radius, ...filters } = request.query;

  // Если указаны координаты и радиус, добавляем их в фильтры
  const shopFilters = {
    ...filters,
    ...(latitude !== undefined && longitude !== undefined && radius !== undefined
      ? { coordinates: { latitude, longitude }, radius }
      : {}),
  };

  const shops = await listShops(shopFilters);
  return { data: shops };
});
