export const RegisterClientSchema = {
  tags: ['Clients'],
  summary: 'Регистрация нового клиента',
  description: 'Создает нового клиента и возвращает его данные с API ключом',
  payload: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        description: 'Название клиента',
      },
    },
    required: ['name'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Клиент успешно зарегистрирован',
      properties: {
        data: {
          type: 'object',
          properties: {
            client: {
              type: 'object',
              properties: {
                guid: { type: 'string', description: 'Уникальный идентификатор клиента' },
                name: { type: 'string', description: 'Название клиента' },
                apiKey: { type: 'string', description: 'API ключ для доступа к API' },
                removalMark: { type: 'boolean', description: 'Пометка на удаление' },
                createdAt: { type: 'string', description: 'Дата создания' },
                updatedAt: { type: 'string', description: 'Дата обновления' },
              },
            },
          },
        },
      },
    },
  },
} as const;
