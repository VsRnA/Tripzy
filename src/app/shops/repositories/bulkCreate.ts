import { BulkCreateOptions } from 'sequelize';
import Shop, { ShopCreationAttributes } from '#App/shops/models/shop.model';

export async function bulkCreate(
  data: ShopCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<Shop[]> {
  return Shop.bulkCreate(data, repOptions);
}
