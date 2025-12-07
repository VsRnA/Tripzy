import { WhereOptions } from 'sequelize';
import Trip from '#App/trips/models/trip.model';

export async function get(filters: WhereOptions<Trip>): Promise<Trip | null> {
  return Trip.findOne({ where: filters });
}
