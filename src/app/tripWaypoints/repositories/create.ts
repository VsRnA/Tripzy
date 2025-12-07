import { CreateOptions } from 'sequelize';
import TripWaypoint, { TripWaypointCreationAttributes } from '#App/tripWaypoints/models/tripWaypoint.model';

export async function create(data: TripWaypointCreationAttributes, repOptions?: CreateOptions): Promise<TripWaypoint> {
  return TripWaypoint.create(data, repOptions);
}
