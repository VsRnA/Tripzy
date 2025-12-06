import Trip, { TripCreationAttributes } from '#App/trips/models/trip.model';
import { CreateOptions } from 'sequelize';

export async function create(data: TripCreationAttributes, repOptions?: CreateOptions): Promise<Trip> {
  return Trip.create(data, repOptions);
}
