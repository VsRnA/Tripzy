import { WhereOptions, FindOptions, Op } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import Trip, { TripStatus, TripGoal } from '#App/trips/models/trip.model';
import TripWaypoint from '#App/tripWaypoints/models/tripWaypoint.model';
import User from '#App/users/models/user.model';

export interface ListTripFilters {
  guid?: string;
  status?: TripStatus;
  goal?: TripGoal;
  name?: string;
  userGuid?: string;
  budgetMin?: number;
  budgetMax?: number;
  removalMark?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Получает список поездок с фильтрацией и пагинацией
 */
export async function list(filters: ListTripFilters = {}, repOptions?: FindOptions) {
  const where: WhereOptions<Trip> = {};

  if (filters.guid) {
    where.guid = filters.guid;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.goal) {
    where.goal = filters.goal;
  }

  if (filters.name) {
    where.name = { [Op.iLike]: `%${filters.name}%` };
  }

  if (filters.budgetMin !== undefined) {
    where.budgetMin = { [Op.gte]: filters.budgetMin };
  }

  if (filters.budgetMax !== undefined) {
    where.budgetMax = { [Op.lte]: filters.budgetMax };
  }

  if (filters.removalMark !== undefined) {
    where.removalMark = filters.removalMark;
  }

  const includeOptions: any[] = [
    {
      model: TripWaypoint,
      as: 'waypoints',
    },
  ];

  // Если фильтруем по пользователю, добавляем include с where
  if (filters.userGuid) {
    includeOptions.push({
      model: User,
      as: 'users',
      where: { guid: filters.userGuid },
      through: { attributes: [] },
    });
  }

  const trips = await Trip.findAll({
    where,
    include: includeOptions,
    limit: filters.limit || 20,
    offset: filters.offset || 0,
    order: [['createdAt', 'DESC']],
    ...repOptions,
  });

  return plainify(trips);
}
