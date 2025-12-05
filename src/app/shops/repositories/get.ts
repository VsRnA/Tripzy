import Shop from '#App/shops/models/shop.model';
import { FindOptions } from 'sequelize';

export async function get(
  filters: Partial<Pick<Shop, 'guid' | 'clientGuid' | 'name'>>,
  repOptions?: FindOptions,
): Promise<Shop | null> {
  return Shop.findOne({ where: filters, ...repOptions });
}
