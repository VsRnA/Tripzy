import { UserFullSchema } from './components/user';

export const UpdateUserSchema = {
  tags: ['Users'],
  summary: 'Обновление данных пользователя',
  description: 'Обновляет данные текущего пользователя (все поля кроме пароля)',
  payload: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email', description: 'Email адрес пользователя' },
      firstName: { type: 'string', minLength: 1, description: 'Имя пользователя' },
      lastName: { type: 'string', description: 'Фамилия пользователя' },
      patronymicName: { type: 'string', description: 'Отчество пользователя' },
      phone: { type: 'string', description: 'Телефон пользователя' },
      country: { type: 'string', description: 'Страна пользователя' },
      age: { type: 'number', description: 'Возраст пользователя' },
    },
  },
  response: {
    200: {
      description: 'Пользователь успешно обновлен',
      type: 'object',
      properties: {
        data: UserFullSchema,
      },
    },
  },
} as const;
