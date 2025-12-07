import { CreateOptions } from 'sequelize';
import Product, { ProductCreationAttributes } from '#App/products/models/product.model';

export async function create(data: ProductCreationAttributes, repOptions?: CreateOptions): Promise<Product> {
  return Product.create(data, repOptions);
}
