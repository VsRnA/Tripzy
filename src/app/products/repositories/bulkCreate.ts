import Product, { ProductCreationAttributes } from '#App/products/models/product.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ProductCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<Product[]> {
  return Product.bulkCreate(data, repOptions);
}
