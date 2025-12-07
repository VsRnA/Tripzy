import { FindOptions } from 'sequelize';
import ProductAttribute from '#App/productAttributes/models/productAttribute.model';

export async function get(
  filters: Partial<Pick<ProductAttribute, 'productGuid' | 'type' | 'value'>>,
  repOptions?: FindOptions,
): Promise<ProductAttribute | null> {
  return ProductAttribute.findOne({ where: filters, ...repOptions });
}
