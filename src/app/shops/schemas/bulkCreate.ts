export const BulkCreateShopsSchema = {
  tags: ['Shops'],
  summary: 'Массовая загрузка магазинов',
  description: 'Создает несколько магазинов для клиента за один запрос. Требуется JWT авторизация и роль администратора организации. Также требуется API ключ клиента в заголовке X-API-Key',
  security: [{ JWT: [] }],
  headers: {
    type: 'object',
    properties: {
      'x-api-key': {
        type: 'string',
        description: 'API ключ клиента',
      },
      authorization: {
        type: 'string',
        description: 'JWT токен в формате "JWT <token>"',
      },
    },
    required: ['x-api-key', 'authorization'],
  },
  payload: {
    type: 'object',
    properties: {
      shops: {
        type: 'array',
        description: 'Массив магазинов для создания',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              description: 'Название магазина',
            },
            address: {
              type: 'string',
              minLength: 1,
              description: 'Адрес магазина',
            },
            city: {
              type: 'string',
              minLength: 1,
              description: 'Город',
            },
            region: {
              type: 'string',
              minLength: 1,
              description: 'Регион',
            },
            schedule: {
              type: 'object',
              description: 'Расписание работы магазина',
              nullable: true,
            },
            latitude: {
              type: 'number',
              minimum: -90,
              maximum: 90,
              description: 'Широта магазина',
            },
            longitude: {
              type: 'number',
              minimum: -180,
              maximum: 180,
              description: 'Долгота магазина',
            },
          },
          required: ['name', 'address', 'city', 'region', 'latitude', 'longitude'],
        },
      },
    },
    required: ['shops'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Магазины успешно созданы',
      properties: {
        data: {
          type: 'object',
          properties: {
            shops: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  guid: { type: 'string', description: 'UUID магазина' },
                  clientGuid: { type: 'string', description: 'UUID клиента' },
                  name: { type: 'string', description: 'Название магазина' },
                  address: { type: 'string', description: 'Адрес' },
                  city: { type: 'string', description: 'Город' },
                  region: { type: 'string', description: 'Регион' },
                  schedule: { type: 'object', description: 'Расписание работы', nullable: true },
                  latitude: { type: 'number', description: 'Широта магазина' },
                  longitude: { type: 'number', description: 'Долгота магазина' },
                  removalMark: { type: 'boolean', description: 'Пометка на удаление' },
                  createdAt: { type: 'string', description: 'Дата создания' },
                  updatedAt: { type: 'string', description: 'Дата обновления' },
                },
              },
            },
            count: { type: 'number', description: 'Количество созданных магазинов' },
          },
        },
      },
    },
  },
} as const;
