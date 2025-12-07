import { FindOptions } from 'sequelize';
import Shop from '#App/shops/models/shop.model';

export async function get(
  filters: Partial<Pick<Shop, 'guid' | 'clientGuid' | 'name'>>,
  repOptions?: FindOptions,
): Promise<Shop | null> {
  return Shop.findOne({ where: filters, ...repOptions });
}
