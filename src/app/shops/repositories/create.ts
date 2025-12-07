import { CreateOptions } from 'sequelize';
import Shop, { ShopCreationAttributes } from '#App/shops/models/shop.model';

export async function create(data: ShopCreationAttributes, repOptions?: CreateOptions): Promise<Shop> {
  return Shop.create(data, repOptions);
}
