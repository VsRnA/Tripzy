import Shop, { ShopCreationAttributes } from '#App/shops/models/shop.model';
import { CreateOptions } from 'sequelize';

export async function create(data: ShopCreationAttributes, repOptions?: CreateOptions): Promise<Shop> {
  return Shop.create(data, repOptions);
}
