import Favorite from '#App/favorites/models/favorite.model';
import { DestroyOptions } from 'sequelize';

export async function deleteFavorite(
  filters: Partial<Pick<Favorite, 'userGuid' | 'productGuid'>>,
  repOptions?: DestroyOptions,
): Promise<number> {
  return Favorite.destroy({ where: filters, ...repOptions });
}
