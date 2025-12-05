import ShopAdministrator, { ShopAdministratorCreationAttributes } from '#App/shopAdministrators/models/shopAdministrator.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ShopAdministratorCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<ShopAdministrator[]> {
  return ShopAdministrator.bulkCreate(data, repOptions);
}
