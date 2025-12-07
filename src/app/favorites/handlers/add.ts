import { httpTransport } from '#Infrastructure/fastify';
import { EntityAlreadyExistedError } from '#Lib/errors/entityAlreadyExistedError';
import { create as createFavorites } from '../repositories/create';
import { get as getFavorite } from '../repositories/get';
import { AddToFavoritesSchema } from '../schemas/add';

httpTransport.handler.post('/api/favorites/v1', AddToFavoritesSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const { productGuid } = request.payload;

  // Проверяем, нет ли уже товара в избранном
  const existingFavorite = await getFavorite({ userGuid, productGuid });

  if (existingFavorite) {
    throw new EntityAlreadyExistedError('Favorite', { userGuid, productGuid });
  }

  const favorite = await createFavorites({
    userGuid,
    productGuid,
  });

  return { data: favorite };
});
