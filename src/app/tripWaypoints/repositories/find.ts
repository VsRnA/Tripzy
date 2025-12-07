import { WhereOptions, FindOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import { NotFoundError } from '#Lib/errors';
import TripWaypoint from '#App/tripWaypoints/models/tripWaypoint.model';

export async function find(filters: WhereOptions<TripWaypoint>, repOptions?: FindOptions) {
  const waypoint = await TripWaypoint.findOne({
    where: filters,
    ...repOptions,
  });
  if (!waypoint) {
    throw new NotFoundError('TripWaypoint', filters);
  }
  return plainify(waypoint);
}
