import { httpTransport } from '#Infrastructure/fastify';
import { deleteFavorite } from '../repositories/delete';
import { RemoveFromFavoritesSchema } from '../schemas/remove';

httpTransport.handler.delete('/api/favorites/v1/:productGuid', RemoveFromFavoritesSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const { productGuid } = request.params;

  const deletedCount = await deleteFavorite({ userGuid, productGuid });

  if (deletedCount === 0) {
    return { message: 'Товар не найден в избранном' };
  }

  return { message: 'Товар успешно удален из избранного' };
});
