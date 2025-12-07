export const BulkCreateProductAttributesSchema = {
  tags: ['ProductAttributes'],
  summary: 'Массовая загрузка атрибутов для товаров',
  description: 'Создает атрибуты для товаров клиента. Требуется API ключ клиента в заголовке X-API-Key',
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
      productAttributes: {
        type: 'array',
        description: 'Массив атрибутов для создания',
        items: {
          type: 'object',
          properties: {
            productGuid: {
              type: 'string',
              format: 'uuid',
              description: 'UUID товара',
            },
            type: {
              type: 'string',
              enum: ['tag', 'craftType', 'material'],
              description: 'Тип атрибута',
            },
            value: {
              type: 'string',
              description: 'Значение атрибута',
            },
          },
          required: ['productGuid', 'type', 'value'],
        },
      },
    },
    required: ['productAttributes'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Атрибуты успешно созданы',
      properties: {
        data: {
          type: 'object',
          properties: {
            productAttributes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productGuid: { type: 'string', description: 'UUID товара' },
                  type: { type: 'string', description: 'Тип атрибута' },
                  value: { type: 'string', description: 'Значение атрибута' },
                  createdAt: { type: 'string', description: 'Дата создания' },
                  updatedAt: { type: 'string', description: 'Дата обновления' },
                },
              },
            },
            count: { type: 'number', description: 'Количество созданных атрибутов' },
          },
        },
      },
    },
  },
} as const;
