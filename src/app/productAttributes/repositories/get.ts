import ProductAttribute from '#App/productAttributes/models/productAttribute.model';
import { FindOptions } from 'sequelize';

export async function get(
  filters: Partial<Pick<ProductAttribute, 'productGuid' | 'type' | 'value'>>,
  repOptions?: FindOptions,
): Promise<ProductAttribute | null> {
  return ProductAttribute.findOne({ where: filters, ...repOptions });
}
