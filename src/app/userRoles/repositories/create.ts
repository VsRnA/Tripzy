import { CreateOptions } from 'sequelize';
import UserRole, { UserRoleCreationAttributes } from '#App/userRoles/models/userRole.model';

export async function create(
  data: UserRoleCreationAttributes,
  repOptions?: CreateOptions,
): Promise<UserRole> {
  const role = await UserRole.create(data, repOptions);

  return role;
}
