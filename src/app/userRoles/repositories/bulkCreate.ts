import { BulkCreateOptions } from 'sequelize';
import UserRole, { UserRoleCreationAttributes } from '#App/userRoles/models/userRole.model';

export async function bulkCreate(
  data: UserRoleCreationAttributes[],
  repOptions?: BulkCreateOptions,
): Promise<UserRole[]> {
  const roles = await UserRole.bulkCreate(data, repOptions);

  return roles;
}
