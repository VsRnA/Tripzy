export const AddToFavoritesSchema = {
  tags: ['Favorites'],
  summary: 'Добавить товар в избранное',
  description: 'Добавляет товар в список избранного пользователя',
  payload: {
    type: 'object',
    required: ['productGuid'],
    properties: {
      productGuid: { type: 'string', format: 'uuid', description: 'UUID товара' },
    },
  },
  response: {
    201: {
      description: 'Товар успешно добавлен в избранное',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            userGuid: { type: 'string', description: 'UUID пользователя' },
            productGuid: { type: 'string', description: 'UUID товара' },
            createdAt: { type: 'string', description: 'Дата создания' },
            updatedAt: { type: 'string', description: 'Дата обновления' },
          },
        },
      },
    },
    409: {
      description: 'Товар уже в избранном',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
} as const;
