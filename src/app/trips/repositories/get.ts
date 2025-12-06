import Trip from '#App/trips/models/trip.model';
import { WhereOptions } from 'sequelize';

export async function get(filters: WhereOptions<Trip>): Promise<Trip | null> {
  return Trip.findOne({ where: filters });
}
