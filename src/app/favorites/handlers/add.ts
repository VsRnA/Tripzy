import { httpTransport } from '#Infrastructure/fastify';
import { create as createFavorites } from '../repositories/create';
import { AddToFavoritesSchema } from '../schemas/add';

httpTransport.handler.post('/api/favorites/v1', AddToFavoritesSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const { productGuid } = request.payload;

  const favorite = await createFavorites({
    userGuid,
    productGuid,
  });

  return { data: favorite };
});
