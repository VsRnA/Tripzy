import Product, { ProductCreationAttributes } from '#App/products/models/product.model';
import { CreateOptions } from 'sequelize';

export async function create(data: ProductCreationAttributes, repOptions?: CreateOptions): Promise<Product> {
  return Product.create(data, repOptions);
}
