import UserTripsAssignment, { UserTripsAssignmentCreationAttributes } from '#App/userTripsAssignment/models/userTripsAssignment.model';
import { CreateOptions } from 'sequelize';

export async function create(data: UserTripsAssignmentCreationAttributes, repOptions?: CreateOptions): Promise<UserTripsAssignment> {
  return UserTripsAssignment.create(data, repOptions);
}
