export const UploadProductImagesSchema = {
  tags: ['Product Attachments'],
  summary: 'Загрузка изображений продукта',
  description: 'Загружает несколько изображений для продукта в S3 хранилище. Требуется API ключ клиента в заголовке X-API-Key',
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
  params: {
    type: 'object',
    properties: {
      productGuid: {
        type: 'string',
        format: 'uuid',
        description: 'UUID продукта',
      },
    },
    required: ['productGuid'],
  },
  consumes: ['multipart/form-data'],
  response: {
    200: {
      type: 'object',
      description: 'Изображения успешно загружены',
      properties: {
        data: {
          type: 'object',
          properties: {
            attachments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productGuid: { type: 'string', description: 'UUID продукта' },
                  attachmentGuid: { type: 'string', description: 'UUID вложения' },
                  url: { type: 'string', description: 'URL изображения в S3' },
                  createdAt: { type: 'string', description: 'Дата создания' },
                },
              },
            },
            count: { type: 'number', description: 'Количество загруженных изображений' },
          },
        },
      },
    },
  },
} as const;
