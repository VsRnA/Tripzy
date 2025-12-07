import { CreateOptions } from 'sequelize';
import Trip, { TripCreationAttributes } from '#App/trips/models/trip.model';

export async function create(data: TripCreationAttributes, repOptions?: CreateOptions): Promise<Trip> {
  return Trip.create(data, repOptions);
}
