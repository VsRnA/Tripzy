import { AuthResponseSchema, UserInputSchema } from './components/user';

export const RegisterSchema = {
  tags: ['Auth'],
  summary: 'Регистрация нового пользователя',
  description: 'Создает нового пользователя с ролью TOURIST и возвращает JWT токен',
  payload: {
    type: 'object',
    properties: {
      email: UserInputSchema.properties.email,
      password: { ...UserInputSchema.properties.password, minLength: 6, description: 'Пароль (минимум 6 символов)' },
      firstName: UserInputSchema.properties.firstName,
    },
    required: ['email', 'password', 'firstName'],
  },
  response: {
    201: {
      description: 'Пользователь успешно зарегистрирован',
      ...AuthResponseSchema,
    },
  },
} as const;
