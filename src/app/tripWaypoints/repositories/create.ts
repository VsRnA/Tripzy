import TripWaypoint, { TripWaypointCreationAttributes } from '#App/tripWaypoints/models/tripWaypoint.model';
import { CreateOptions } from 'sequelize';

export async function create(data: TripWaypointCreationAttributes, repOptions?: CreateOptions): Promise<TripWaypoint> {
  return TripWaypoint.create(data, repOptions);
}
