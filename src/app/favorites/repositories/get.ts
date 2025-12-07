import { FindOptions, WhereOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import Favorite, { FavoriteAttributes } from '#App/favorites/models/favorite.model';

export async function get(
  filters: WhereOptions<FavoriteAttributes>,
  repOptions?: Omit<FindOptions, 'where'>,
) {
  const favorite = await Favorite.findOne({ where: filters, ...repOptions });
  return favorite ? plainify(favorite) : null;
}
