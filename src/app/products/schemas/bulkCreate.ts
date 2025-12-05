export const BulkCreateProductsSchema = {
  tags: ['Products'],
  summary: 'Массовая загрузка товаров',
  description: 'Создает несколько товаров для магазинов клиента. Требуется API ключ клиента в заголовке X-API-Key',
  headers: {
    type: 'object',
    properties: {
      'x-api-key': {
        type: 'string',
        description: 'API ключ клиента',
      },
    },
    required: ['x-api-key'],
  },
  payload: {
    type: 'object',
    properties: {
      products: {
        type: 'array',
        description: 'Массив товаров для создания',
        items: {
          type: 'object',
          properties: {
            shopGuid: {
              type: 'string',
              format: 'uuid',
              description: 'UUID магазина',
            },
            name: {
              type: 'string',
              minLength: 1,
              description: 'Название товара',
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Цена товара',
            },
            quantity: {
              type: 'number',
              minimum: 0,
              description: 'Количество на складе',
            },
          },
          required: ['shopGuid', 'name', 'price'],
        },
      },
    },
    required: ['products'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Товары успешно созданы',
      properties: {
        data: {
          type: 'object',
          properties: {
            products: {
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
                },
              },
            },
            count: { type: 'number', description: 'Количество созданных товаров' },
          },
        },
      },
    },
  },
} as const;
