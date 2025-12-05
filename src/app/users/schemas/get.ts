export const GetSchema = {
  tags: ['Users'],
  summary: 'Получить пользователя по GUID',
  description: 'Возвращает информацию о пользователе по его уникальному идентификатору',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      guid: {
        type: 'string',
        format: 'uuid',
        description: 'GUID пользователя',
      },
    },
    required: ['guid'],
  },
  response: {
    200: {
      type: 'object',
      description: 'Информация о пользователе',
      properties: {
        data: {
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
} as const;
