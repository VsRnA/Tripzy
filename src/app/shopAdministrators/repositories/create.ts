import { CreateOptions } from 'sequelize';
import ShopAdministrator, { ShopAdministratorCreationAttributes } from '#App/shopAdministrators/models/shopAdministrator.model';

export async function create(
  data: ShopAdministratorCreationAttributes,
  repOptions?: CreateOptions,
): Promise<ShopAdministrator> {
  return ShopAdministrator.create(data, repOptions);
}
