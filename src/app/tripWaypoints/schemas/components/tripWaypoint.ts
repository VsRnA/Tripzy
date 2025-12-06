export const TripWaypointTypeEnum = ['city', 'attraction'] as const;

export const TripWaypointSchema = {
  type: 'object',
  properties: {
    guid: { type: 'string', description: 'Уникальный идентификатор точки' },
    tripGuid: { type: 'string', description: 'UUID поездки' },
    parentGuid: { type: 'string', nullable: true, description: 'UUID родительской точки (для достопримечательностей)' },
    type: { type: 'string', enum: TripWaypointTypeEnum, description: 'Тип точки маршрута' },
    address: { type: 'string', description: 'Адрес точки' },
    orderIndex: { type: 'number', description: 'Порядковый номер' },
    visitDate: { type: 'string', nullable: true, description: 'Дата посещения' },
    description: { type: 'string', nullable: true, description: 'Описание' },
    latitude: { type: 'number', description: 'Широта точки маршрута' },
    longitude: { type: 'number', description: 'Долгота точки маршрута' },
  },
} as const;

export const CityInputSchema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
      description: 'Адрес города',
    },
    visitDate: {
      type: 'string',
      format: 'date',
      description: 'Дата посещения (YYYY-MM-DD)',
    },
    description: {
      type: 'string',
      description: 'Описание города',
    },
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
      description: 'Широта города',
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
      description: 'Долгота города',
    },
  },
  required: ['address', 'latitude', 'longitude'],
} as const;

export const AttractionInputSchema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
      description: 'Адрес достопримечательности',
    },
    visitDate: {
      type: 'string',
      format: 'date',
      description: 'Дата посещения (YYYY-MM-DD)',
    },
    description: {
      type: 'string',
      description: 'Описание достопримечательности',
    },
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90,
      description: 'Широта достопримечательности',
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180,
      description: 'Долгота достопримечательности',
    },
  },
  required: ['address', 'latitude', 'longitude'],
} as const;
