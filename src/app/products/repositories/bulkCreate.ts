import { BulkCreateOptions } from 'sequelize';
import Product, { ProductCreationAttributes } from '#App/products/models/product.model';

export async function bulkCreate(
  data: ProductCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<Product[]> {
  return Product.bulkCreate(data, repOptions);
}
