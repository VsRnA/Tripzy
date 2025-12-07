import { UserBasicSchema } from './components/user';

export const CreateClientUserSchema = {
  tags: ['Client Users'],
  summary: 'Создание пользователя для клиента',
  description: 'Создает нового пользователя с привязкой к клиенту и заданной ролью (CLIENT_ADMIN или SHOP_ADMIN)',
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
      email: { type: 'string', format: 'email', description: 'Email адрес пользователя' },
      password: { type: 'string', minLength: 6, description: 'Пароль (минимум 6 символов)' },
      firstName: { type: 'string', minLength: 1, description: 'Имя пользователя' },
      lastName: { type: 'string', description: 'Фамилия пользователя', nullable: true },
      patronymicName: { type: 'string', description: 'Отчество пользователя', nullable: true },
      phone: { type: 'string', description: 'Телефон пользователя', nullable: true },
      country: { type: 'string', description: 'Страна пользователя', nullable: true },
      age: { type: 'number', description: 'Возраст пользователя', nullable: true },
      roleKeyWord: {
        type: 'string',
        enum: ['clientAdmin', 'shopAdmin'],
        description: 'Роль пользователя (clientAdmin - администратор организации, shopAdmin - администратор магазина)',
      },
    },
    required: ['email', 'password', 'firstName', 'roleKeyWord'],
  },
  response: {
    201: {
      description: 'Пользователь успешно создан',
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            user: UserBasicSchema,
          },
        },
      },
    },
  },
} as const;
