export const GetRecommendationsSchema = {
  tags: ['Products'],
  summary: 'Получить рекомендованные товары',
  description: 'Возвращает рекомендованные товары для туристов, отсортированные по весу релевантности',
  query: {
    type: 'object',
    properties: {
      tags: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['children', 'relatives', 'colleagues', 'friends', 'partner', 'parents', 'myself', 'other'],
        },
        description: 'Фильтр по тегам товара (кому дарят)',
      },
      craftTypes: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'folkCrafts',
            'handMade',
            'artisticCrafts',
            'traditionalCrafts',
            'souvenirs',
            'jewelry',
            'textile',
            'ceramics',
            'woodWorking',
            'metalwork',
          ],
        },
        description: 'Фильтр по типу ремесла',
      },
      materials: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['wood', 'metal', 'glass', 'ceramic', 'textile', 'leather', 'stone', 'plastic', 'paper', 'mixed'],
        },
        description: 'Фильтр по материалу',
      },
      region: {
        type: 'string',
        description: 'Регион магазина',
      },
      city: {
        type: 'string',
        description: 'Город магазина',
      },
      waypointGuid: {
        type: 'string',
        format: 'uuid',
        description: 'UUID точки маршрута для поиска магазинов в радиусе',
      },
      radius: {
        type: 'number',
        minimum: 0,
        description: 'Радиус поиска в километрах (используется вместе с waypointGuid)',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Рекомендованные товары получены',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              guid: { type: 'string', description: 'UUID товара' },
              shopGuid: { type: 'string', description: 'UUID магазина' },
              name: { type: 'string', description: 'Название товара' },
              price: { type: 'number', description: 'Цена' },
              quantity: { type: 'number', description: 'Количество на складе' },
              removalMark: { type: 'boolean', description: 'Пометка на удаление' },
              createdAt: { type: 'string', description: 'Дата создания' },
              updatedAt: { type: 'string', description: 'Дата обновления' },
              shop: {
                type: 'object',
                description: 'Информация о магазине',
                properties: {
                  guid: { type: 'string', description: 'UUID магазина' },
                  name: { type: 'string', description: 'Название магазина' },
                  region: { type: 'string', description: 'Регион магазина' },
                  city: { type: 'string', description: 'Город магазина' },
                },
              },
              attributes: {
                type: 'array',
                description: 'Атрибуты товара',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', description: 'Тип атрибута' },
                    value: { type: 'string', description: 'Значение атрибута' },
                    isCulture: { type: 'boolean', description: 'Привязка к культуре региона' },
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
