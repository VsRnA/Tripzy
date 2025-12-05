export const LoginSchema = {
  tags: ['Auth'],
  summary: 'Авторизация пользователя',
  description: 'Аутентификация пользователя по email и паролю, возвращает JWT токен',
  payload: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email адрес пользователя',
      },
      password: {
        type: 'string',
        minLength: 1,
        description: 'Пароль пользователя',
      },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      type: 'object',
      description: 'Авторизация прошла успешно',
      properties: {
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                guid: { type: 'string', description: 'Уникальный идентификатор пользователя' },
                email: { type: 'string', description: 'Email адрес' },
                firstName: { type: 'string', description: 'Имя пользователя' },
                roles: {
                  type: 'array',
                  description: 'Роли пользователя',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'number' },
                      name: { type: 'string' },
                      keyWord: { type: 'string' },
                    },
                  },
                },
                createdAt: { type: 'string', description: 'Дата создания' },
                updatedAt: { type: 'string', description: 'Дата обновления' },
              },
            },
            token: { type: 'string', description: 'JWT токен для авторизации' },
          },
        },
      },
    },
  },
} as const;
