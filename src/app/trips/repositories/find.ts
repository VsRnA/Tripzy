import Trip from '#App/trips/models/trip.model';
import TripWaypoint from '#App/tripWaypoints/models/tripWaypoint.model';
import { WhereOptions, FindOptions } from 'sequelize';
import { NotFoundError } from '#Lib/errors';
import { plainify } from '#Lib/database/sequelize';

export async function find(filters: WhereOptions<Trip>, repOptions?: FindOptions) {
  const trip = await Trip.findOne({
    where: filters,
    include: [
      {
        model: TripWaypoint,
        as: 'waypoints',
      },
    ],
    ...repOptions,
  });
  if (!trip) {
    throw new NotFoundError('Trip', filters);
  }
  return plainify(trip);
}
