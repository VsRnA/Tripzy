export const ListSchema = {
  tags: ['Users'],
  summary: 'Получить список пользователей',
  description: 'Возвращает список пользователей с возможностью фильтрации и пагинации',
  security: [{ bearerAuth: [] }],
  query: {
    type: 'object',
    properties: {
      email: { type: 'string', description: 'Фильтр по email' },
      firstName: { type: 'string', description: 'Фильтр по имени' },
      lastName: { type: 'string', description: 'Фильтр по фамилии' },
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
  },
  response: {
    200: {
      type: 'object',
      description: 'Список пользователей',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              guid: { type: 'string', description: 'Уникальный идентификатор' },
              email: { type: 'string', description: 'Email адрес' },
              firstName: { type: 'string', description: 'Имя' },
              lastName: { type: ['string', 'null'], description: 'Фамилия' },
              patronymicName: { type: ['string', 'null'], description: 'Отчество' },
              phone: { type: ['string', 'null'], description: 'Телефон' },
              country: { type: ['string', 'null'], description: 'Страна' },
              age: { type: ['number', 'null'], description: 'Возраст' },
              clientId: { type: ['number', 'null'], description: 'ID клиента' },
              roles: {
                type: 'array',
                description: 'Роли пользователя',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    keyWord: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                  },
                },
              },
              createdAt: { type: 'string', description: 'Дата создания' },
              updatedAt: { type: 'string', description: 'Дата обновления' },
            },
          },
        },
      },
    },
  },
} as const;
