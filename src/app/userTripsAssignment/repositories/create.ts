import { CreateOptions } from 'sequelize';
import UserTripsAssignment, { UserTripsAssignmentCreationAttributes } from '#App/userTripsAssignment/models/userTripsAssignment.model';

export async function create(data: UserTripsAssignmentCreationAttributes, repOptions?: CreateOptions): Promise<UserTripsAssignment> {
  return UserTripsAssignment.create(data, repOptions);
}
