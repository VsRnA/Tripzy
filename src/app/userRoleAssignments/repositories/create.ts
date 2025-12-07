import { CreateOptions } from 'sequelize';
import UserRoleAssignment from '#App/userRoleAssignments/models/userRoleAssignment.model';

interface CreateUserRoleAssignmentData {
  userGuid: string;
  roleId: number;
}

export async function create(data: CreateUserRoleAssignmentData, repOptions?: CreateOptions): Promise<UserRoleAssignment> {
  const assignment = await UserRoleAssignment.create({
    userGuid: data.userGuid,
    roleId: data.roleId,
  }, repOptions);

  return assignment;
}
