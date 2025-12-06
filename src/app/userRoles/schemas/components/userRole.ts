export const UserRoleSchema = {
  type: 'object',
  properties: {
    id: { type: 'number', description: 'ID роли' },
    name: { type: 'string', description: 'Название роли' },
    keyWord: { type: 'string', description: 'Ключевое слово роли' },
  },
} as const;

export const UserRoleWithTimestampsSchema = {
  type: 'object',
  properties: {
    ...UserRoleSchema.properties,
    createdAt: { type: 'string', description: 'Дата создания' },
    updatedAt: { type: 'string', description: 'Дата обновления' },
  },
} as const;
