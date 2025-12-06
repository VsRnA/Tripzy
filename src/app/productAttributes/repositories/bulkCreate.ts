import ProductAttribute, { ProductAttributeCreationAttributes } from '#App/productAttributes/models/productAttribute.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ProductAttributeCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<ProductAttribute[]> {
  return ProductAttribute.bulkCreate(data, repOptions);
}
