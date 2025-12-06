export const RemoveFromFavoritesSchema = {
  tags: ['Favorites'],
  summary: 'Удалить товар из избранного',
  description: 'Удаляет товар из списка избранного пользователя',
  params: {
    type: 'object',
    required: ['productGuid'],
    properties: {
      productGuid: { type: 'string', format: 'uuid', description: 'UUID товара' },
    },
  },
  response: {
    200: {
      description: 'Товар успешно удален из избранного',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Товар не найден в избранном',
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
} as const;
