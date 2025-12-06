import { httpTransport } from '#Infrastructure/fastify';
import { AddToFavoritesSchema } from '../schemas/add';
import { create as createFavorites } from '../repositories/create';

httpTransport.handler.post('/api/favorites/v1', AddToFavoritesSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const { productGuid } = request.payload;

  const favorite = await createFavorites({
    userGuid,
    productGuid,
  });

  return { data: favorite };
});
