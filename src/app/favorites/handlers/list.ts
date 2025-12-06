import { httpTransport } from '#Infrastructure/fastify';
import { GetFavoritesListSchema } from '../schemas/list';
import { list as listFavorites } from '../repositories/list';

httpTransport.handler.get('/api/favorites/v1', GetFavoritesListSchema, async (request) => {
  const userGuid = request.context.user!.guid;

  const favorites = await listFavorites({ userGuid });

  return {
    data: favorites,
  };
});
