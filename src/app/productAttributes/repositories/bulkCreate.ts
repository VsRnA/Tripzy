import { BulkCreateOptions } from 'sequelize';
import ProductAttribute, { ProductAttributeCreationAttributes } from '#App/productAttributes/models/productAttribute.model';

export async function bulkCreate(
  data: ProductAttributeCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<ProductAttribute[]> {
  return ProductAttribute.bulkCreate(data, repOptions);
}
