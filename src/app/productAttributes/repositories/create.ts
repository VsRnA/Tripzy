import ProductAttribute, { ProductAttributeCreationAttributes } from '#App/productAttributes/models/productAttribute.model';
import { CreateOptions } from 'sequelize';

export async function create(
  data: ProductAttributeCreationAttributes,
  repOptions?: CreateOptions,
): Promise<ProductAttribute> {
  return ProductAttribute.create(data, repOptions);
}
