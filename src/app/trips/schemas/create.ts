import { TripSchema } from './components/trip';
import {
  CityInputSchema,
  AttractionInputSchema,
  TripWaypointSchema,
} from '#App/tripWaypoints/schemas/components/tripWaypoint';

export const CreateTripSchema = {
  tags: ['Trips'],
  summary: 'Создание новой поездки',
  description: 'Создает новую поездку с точками маршрута',
  payload: {
    type: 'object',
    properties: {
      name: TripSchema.properties.name,
      goal: TripSchema.properties.goal,
      budgetMin: TripSchema.properties.budgetMin,
      budgetMax: TripSchema.properties.budgetMax,
      cities: {
        type: 'array',
        minItems: 1,
        description: 'Города в маршруте',
        items: {
          ...CityInputSchema,
          properties: {
            ...CityInputSchema.properties,
            attractions: {
              type: 'array',
              description: 'Достопримечательности города',
              items: AttractionInputSchema,
            },
          },
        },
      },
    },
    required: ['name', 'goal', 'cities'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Поездка успешно создана',
      properties: {
        data: {
          type: 'object',
          properties: {
            trip: {
              type: 'object',
              properties: {
                ...TripSchema.properties,
                waypoints: {
                  type: 'array',
                  description: 'Точки маршрута (города и достопримечательности)',
                  items: {
                    type: 'object',
                    properties: {
                      ...TripWaypointSchema.properties,
                      attractions: {
                        type: 'array',
                        description: 'Достопримечательности (только для городов)',
                        items: { type: 'object' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
