import Favorite from '#App/favorites/models/favorite.model';
import { FindOptions } from 'sequelize';

export interface GetFavoriteProductGuidsFilters {
  userGuid: string;
}

/**
 * Получает список GUID продуктов, находящихся в избранном у пользователя
 * @param filters - фильтры по пользователю
 * @param repOptions - дополнительные опции для запроса
 * @returns массив GUID продуктов в избранном
 */
export async function getFavoriteProductGuids(
  filters: GetFavoriteProductGuidsFilters,
  repOptions?: FindOptions,
): Promise<string[]> {
  const favorites = await Favorite.findAll({
    where: {
      userGuid: filters.userGuid,
    },
    attributes: ['productGuid'],
    ...repOptions,
  });

  return favorites.map((favorite) => favorite.productGuid);
}
