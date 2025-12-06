import { ShopSchema } from './components/shop';

export const ShopListQuerySchema = {
  type: 'object',
  properties: {
    guid: { type: 'string', format: 'uuid', description: 'Фильтр по GUID магазина' },
    clientGuid: { type: 'string', format: 'uuid', description: 'Фильтр по GUID клиента' },
    name: { type: 'string', description: 'Фильтр по названию (поиск по подстроке)' },
    city: { type: 'string', description: 'Фильтр по городу' },
    region: { type: 'string', description: 'Фильтр по региону' },
    removalMark: { type: 'boolean', description: 'Фильтр по пометке удаления' },
    latitude: { type: 'number', minimum: -90, maximum: 90, description: 'Широта для поиска по радиусу' },
    longitude: { type: 'number', minimum: -180, maximum: 180, description: 'Долгота для поиска по радиусу' },
    radius: { type: 'number', minimum: 0, description: 'Радиус поиска в километрах (требуется latitude и longitude)' },
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

export const ShopWithRelationsSchema = {
  type: 'object',
  properties: {
    ...ShopSchema.properties,
    client: {
      type: 'object',
      description: 'Информация о клиенте',
      properties: {
        guid: { type: 'string', description: 'UUID клиента' },
        name: { type: 'string', description: 'Название клиента' },
      },
    },
    products: {
      type: 'array',
      description: 'Товары магазина',
      items: { type: 'object' },
    },
  },
} as const;

export const ListShopsSchema = {
  tags: ['Shops'],
  summary: 'Получить список магазинов',
  description: 'Возвращает список магазинов с возможностью фильтрации и пагинации. Поддерживает поиск по радиусу от заданных координат',
  security: [{ bearerAuth: [] }],
  query: ShopListQuerySchema,
  response: {
    200: {
      type: 'object',
      description: 'Список магазинов',
      properties: {
        data: {
          type: 'array',
          items: ShopWithRelationsSchema,
        },
      },
    },
  },
} as const;
