export const RegisterSchema = {
  tags: ['Auth'],
  summary: 'Регистрация нового пользователя',
  description: 'Создает нового пользователя с ролью USER и возвращает JWT токен',
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
        minLength: 6,
        description: 'Пароль (минимум 6 символов)',
      },
      firstName: {
        type: 'string',
        minLength: 1,
        description: 'Имя пользователя',
      },
    },
    required: ['email', 'password', 'firstName'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Пользователь успешно зарегистрирован',
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
