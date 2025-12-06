import { AuthResponseSchema, UserInputSchema } from './components/user';

export const LoginSchema = {
  tags: ['Auth'],
  summary: 'Авторизация пользователя',
  description: 'Аутентификация пользователя по email и паролю, возвращает JWT токен',
  payload: {
    type: 'object',
    properties: {
      email: UserInputSchema.properties.email,
      password: UserInputSchema.properties.password,
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      description: 'Авторизация прошла успешно',
      ...AuthResponseSchema,
    },
  },
} as const;
