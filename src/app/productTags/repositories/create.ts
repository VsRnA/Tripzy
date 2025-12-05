import ProductTag, { ProductTagCreationAttributes } from '#App/productTags/models/productTag.model';
import { CreateOptions } from 'sequelize';

export async function create(
  data: ProductTagCreationAttributes,
  repOptions?: CreateOptions,
): Promise<ProductTag> {
  return ProductTag.create(data, repOptions);
}
