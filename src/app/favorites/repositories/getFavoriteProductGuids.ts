import { FindOptions } from 'sequelize';
import Favorite from '#App/favorites/models/favorite.model';

export interface GetFavoriteProductGuidsFilters {
  userGuid: string;
}

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
