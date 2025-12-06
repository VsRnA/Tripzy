import { UserFullSchema, UserParamsSchema } from './components/user';

export const GetSchema = {
  tags: ['Users'],
  summary: 'Получить пользователя по GUID',
  description: 'Возвращает информацию о пользователе по его уникальному идентификатору',
  security: [{ bearerAuth: [] }],
  params: {
    ...UserParamsSchema,
    required: ['guid'],
  },
  response: {
    200: {
      type: 'object',
      description: 'Информация о пользователе',
      properties: {
        data: UserFullSchema,
      },
    },
  },
} as const;
