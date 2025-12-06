import Favorite, { FavoriteCreationAttributes } from '#App/favorites/models/favorite.model';
import { plainify } from '#Lib/database/sequelize';
import { CreateOptions } from 'sequelize';

export async function create(data: FavoriteCreationAttributes, repOptions?: CreateOptions) {
  return plainify(Favorite.create(data, repOptions));
}
