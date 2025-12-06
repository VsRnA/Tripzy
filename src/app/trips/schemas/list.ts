import { TripSchema, TripGoalEnum } from './components/trip';
import { TripWaypointSchema } from '#App/tripWaypoints/schemas/components/tripWaypoint';

const TripStatusEnum = ['planned', 'active', 'completed', 'cancelled'] as const;

export const TripListQuerySchema = {
  type: 'object',
  properties: {
    guid: { type: 'string', format: 'uuid', description: 'Фильтр по GUID поездки' },
    status: { type: 'string', enum: TripStatusEnum, description: 'Фильтр по статусу' },
    goal: { type: 'string', enum: TripGoalEnum, description: 'Фильтр по цели поездки' },
    name: { type: 'string', description: 'Фильтр по названию (поиск по подстроке)' },
    userGuid: { type: 'string', format: 'uuid', description: 'Фильтр по GUID пользователя' },
    budgetMin: { type: 'number', minimum: 0, description: 'Фильтр по минимальному бюджету' },
    budgetMax: { type: 'number', minimum: 0, description: 'Фильтр по максимальному бюджету' },
    removalMark: { type: 'boolean', description: 'Фильтр по пометке удаления' },
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Количество записей на страницу',
    },
    offset: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Смещение для пагинации',
    },
  },
} as const;

export const TripWithWaypointsSchema = {
  type: 'object',
  properties: {
    ...TripSchema.properties,
    waypoints: {
      type: 'array',
      description: 'Точки маршрута',
      items: TripWaypointSchema,
    },
  },
} as const;

export const ListTripsSchema = {
  tags: ['Trips'],
  summary: 'Получить список поездок',
  description: 'Возвращает список поездок с возможностью фильтрации и пагинации',
  security: [{ bearerAuth: [] }],
  query: TripListQuerySchema,
  response: {
    200: {
      type: 'object',
      description: 'Список поездок',
      properties: {
        data: {
          type: 'array',
          items: TripWithWaypointsSchema,
        },
      },
    },
  },
} as const;
