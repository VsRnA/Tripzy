import ProductTag, { ProductTagCreationAttributes } from '#App/productTags/models/productTag.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ProductTagCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<ProductTag[]> {
  return ProductTag.bulkCreate(data, repOptions);
}
