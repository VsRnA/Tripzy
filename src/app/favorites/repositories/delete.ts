import { DestroyOptions } from 'sequelize';
import Favorite from '#App/favorites/models/favorite.model';

export async function deleteFavorite(
  filters: Partial<Pick<Favorite, 'userGuid' | 'productGuid'>>,
  repOptions?: DestroyOptions,
): Promise<number> {
  return Favorite.destroy({ where: filters, ...repOptions });
}
