import Product from '#App/products/models/product.model';
import { FindOptions } from 'sequelize';
import { NotFoundError } from '#Lib/errors';

export async function find(
  filters: Partial<Pick<Product, 'guid' | 'shopGuid'>>,
  repOptions?: FindOptions,
): Promise<Product> {
  const product = await Product.findOne({ where: filters, ...repOptions });

  if (!product) {
    throw new NotFoundError('Product', filters);
  }

  return product;
}
