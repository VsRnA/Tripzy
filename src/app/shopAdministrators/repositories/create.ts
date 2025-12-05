import ShopAdministrator, { ShopAdministratorCreationAttributes } from '#App/shopAdministrators/models/shopAdministrator.model';
import { CreateOptions } from 'sequelize';

export async function create(
  data: ShopAdministratorCreationAttributes,
  repOptions?: CreateOptions,
): Promise<ShopAdministrator> {
  return ShopAdministrator.create(data, repOptions);
}
