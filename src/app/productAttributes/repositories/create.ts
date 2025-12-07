import { CreateOptions } from 'sequelize';
import ProductAttribute, { ProductAttributeCreationAttributes } from '#App/productAttributes/models/productAttribute.model';

export async function create(
  data: ProductAttributeCreationAttributes,
  repOptions?: CreateOptions,
): Promise<ProductAttribute> {
  return ProductAttribute.create(data, repOptions);
}
