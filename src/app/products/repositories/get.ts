import { FindOptions } from 'sequelize';
import Product from '#App/products/models/product.model';

export async function get(
  filters: Partial<Pick<Product, 'guid' | 'shopGuid'>>,
  repOptions?: FindOptions,
): Promise<Product | null> {
  return Product.findOne({ where: filters, ...repOptions });
}
