import { BulkCreateOptions } from 'sequelize';
import ShopAdministrator, { ShopAdministratorCreationAttributes } from '#App/shopAdministrators/models/shopAdministrator.model';

export async function bulkCreate(
  data: ShopAdministratorCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<ShopAdministrator[]> {
  return ShopAdministrator.bulkCreate(data, repOptions);
}
