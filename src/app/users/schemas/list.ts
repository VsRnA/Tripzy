import { UserFullSchema, UserListQuerySchema } from './components/user';

export const ListSchema = {
  tags: ['Users'],
  summary: 'Получить список пользователей',
  description: 'Возвращает список пользователей с возможностью фильтрации и пагинации',
  security: [{ bearerAuth: [] }],
  query: UserListQuerySchema,
  response: {
    200: {
      type: 'object',
      description: 'Список пользователей',
      properties: {
        data: {
          type: 'array',
          items: UserFullSchema,
        },
      },
    },
  },
} as const;
