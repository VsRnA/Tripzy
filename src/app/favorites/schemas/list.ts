export const GetFavoritesListSchema = {
  tags: ['Favorites'],
  summary: 'Получить список избранных товаров',
  description: 'Возвращает список избранных товаров пользователя с информацией о товаре и магазине',
  response: {
    200: {
      type: 'object',
      description: 'Список избранных товаров получен',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userGuid: { type: 'string', description: 'UUID пользователя' },
              productGuid: { type: 'string', description: 'UUID товара' },
              createdAt: { type: 'string', description: 'Дата добавления в избранное' },
              updatedAt: { type: 'string', description: 'Дата обновления' },
              product: {
                type: 'object',
                description: 'Информация о товаре',
                properties: {
                  guid: { type: 'string', description: 'UUID товара' },
                  shopGuid: { type: 'string', description: 'UUID магазина' },
                  name: { type: 'string', description: 'Название товара' },
                  price: { type: 'number', description: 'Цена' },
                  quantity: { type: 'number', description: 'Количество на складе' },
                  removalMark: { type: 'boolean', description: 'Пометка на удаление' },
                  createdAt: { type: 'string', description: 'Дата создания товара' },
                  updatedAt: { type: 'string', description: 'Дата обновления товара' },
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
                  attachments: {
                    type: 'array',
                    description: 'Вложения (картинки) товара',
                    items: {
                      type: 'object',
                      properties: {
                        attachmentGuid: { type: 'string', description: 'UUID вложения' },
                        url: { type: 'string', description: 'URL изображения' },
                      },
                    },
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
