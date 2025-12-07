import { CreateOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import Favorite, { FavoriteCreationAttributes } from '#App/favorites/models/favorite.model';

export async function create(data: FavoriteCreationAttributes, repOptions?: CreateOptions) {
  return plainify(Favorite.create(data, repOptions));
}
