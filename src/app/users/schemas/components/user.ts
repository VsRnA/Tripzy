import { UserRoleWithTimestampsSchema, UserRoleSchema } from '#App/userRoles/schemas/components/userRole';

export const User = {
  guid: { type: 'string', description: 'Уникальный идентификатор' },
  email: { type: 'string', description: 'Email адрес' },
  firstName: { type: 'string', description: 'Имя' },
  lastName: { type: ['string', 'null'], description: 'Фамилия' },
  patronymicName: { type: ['string', 'null'], description: 'Отчество' },
  phone: { type: ['string', 'null'], description: 'Телефон' },
  country: { type: ['string', 'null'], description: 'Страна' },
  age: { type: ['number', 'null'], description: 'Возраст' },
  clientGuid: { type: ['string', 'null'], description: 'GUID клиента' },
  createdAt: { type: 'string', description: 'Дата создания' },
  updatedAt: { type: 'string', description: 'Дата обновления' },
} as const;

export const UserInputSchema = {
  type: 'object',
  properties: {
    email: { ...User.email, format: 'email', description: 'Email адрес пользователя' },
    password: { type: 'string', minLength: 1, description: 'Пароль пользователя' },
    firstName: { ...User.firstName, minLength: 1, description: 'Имя пользователя' },
  },
} as const;

export const UserBasicSchema = {
  type: 'object',
  properties: {
    guid: User.guid,
    email: User.email,
    firstName: User.firstName,
    roles: {
      type: 'array',
      description: 'Роли пользователя',
      items: UserRoleSchema,
    },
    createdAt: User.createdAt,
    updatedAt: User.updatedAt,
  },
} as const;

export const UserFullSchema = {
  type: 'object',
  properties: {
    ...User,
    roles: {
      type: 'array',
      description: 'Роли пользователя',
      items: UserRoleWithTimestampsSchema,
    },
  },
} as const;

export const UserParamsSchema = {
  type: 'object',
  properties: {
    guid: { ...User.guid, format: 'uuid', description: 'GUID пользователя' },
  },
} as const;

export const UserListQuerySchema = {
  type: 'object',
  properties: {
    email: { type: 'string', description: 'Фильтр по email' },
    firstName: { type: 'string', description: 'Фильтр по имени' },
    lastName: { type: 'string', description: 'Фильтр по фамилии' },
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 100,
      default: 20,
      description: 'Количество записей на страницу',
    },
    offset: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Смещение для пагинации',
    },
  },
} as const;

export const AuthResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        user: UserBasicSchema,
        token: { type: 'string', description: 'JWT токен для авторизации' },
      },
    },
  },
} as const;
