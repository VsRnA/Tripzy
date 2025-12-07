import { WhereOptions, FindOptions } from 'sequelize';
import UserRole, { UserRoleAttributes } from '#App/userRoles/models/userRole.model';

interface GetUserRoleFilters {
  id?: number;
  keyWord?: string;
  clientGuid?: string | null;
}

export async function get(filters: GetUserRoleFilters, repOptions?: FindOptions): Promise<UserRole | null> {
  const where: WhereOptions<UserRoleAttributes> = {};

  if (filters.id !== undefined) {
    where.id = filters.id;
  }

  if (filters.keyWord) {
    where.keyWord = filters.keyWord;
  }

  if (filters.clientGuid !== undefined) {
    where.clientGuid = filters.clientGuid;
  }

  const role = await UserRole.findOne({
    where,
    ...repOptions,
  });

  return role;
}
