import Shop, { ShopCreationAttributes } from '#App/shops/models/shop.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ShopCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<Shop[]> {
  return Shop.bulkCreate(data, repOptions);
}
