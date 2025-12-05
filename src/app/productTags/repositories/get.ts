import ProductTag from '#App/productTags/models/productTag.model';
import { FindOptions } from 'sequelize';

export async function get(
  filters: Partial<Pick<ProductTag, 'productGuid' | 'tag'>>,
  repOptions?: FindOptions,
): Promise<ProductTag | null> {
  return ProductTag.findOne({ where: filters, ...repOptions });
}
