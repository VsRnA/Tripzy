export const BulkCreateProductTagsSchema = {
  tags: ['ProductTags'],
  summary: 'Массовая загрузка тегов для товаров',
  description: 'Создает теги для товаров клиента. Требуется API ключ клиента в заголовке X-API-Key',
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
      productTags: {
        type: 'array',
        description: 'Массив тегов для создания',
        items: {
          type: 'object',
          properties: {
            productGuid: {
              type: 'string',
              format: 'uuid',
              description: 'UUID товара',
            },
            tag: {
              type: 'string',
              enum: ['children', 'relatives', 'colleagues', 'friends', 'partner', 'parents', 'myself', 'other'],
              description: 'Тег для системы рекомендаций',
            },
          },
          required: ['productGuid', 'tag'],
        },
      },
    },
    required: ['productTags'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Теги успешно созданы',
      properties: {
        data: {
          type: 'object',
          properties: {
            productTags: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productGuid: { type: 'string', description: 'UUID товара' },
                  tag: {
                    type: 'string',
                    enum: ['children', 'relatives', 'colleagues', 'friends', 'partner', 'parents', 'myself', 'other'],
                    description: 'Тег'
                  },
                  createdAt: { type: 'string', description: 'Дата создания' },
                  updatedAt: { type: 'string', description: 'Дата обновления' },
                },
              },
            },
            count: { type: 'number', description: 'Количество созданных тегов' },
          },
        },
      },
    },
  },
} as const;
