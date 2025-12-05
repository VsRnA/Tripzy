export const BulkCreateShopAdministratorsSchema = {
  tags: ['ShopAdministrators'],
  summary: 'Массовая загрузка администраторов магазинов',
  description: 'Создает пользователей и назначает их администраторами магазинов. Требуется API ключ клиента в заголовке X-API-Key',
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
      administrators: {
        type: 'array',
        description: 'Массив администраторов для создания',
        items: {
          type: 'object',
          properties: {
            shopGuid: {
              type: 'string',
              format: 'uuid',
              description: 'UUID магазина',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email администратора',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Пароль (минимум 6 символов)',
            },
            firstName: {
              type: 'string',
              minLength: 1,
              description: 'Имя',
            },
            lastName: {
              type: 'string',
              description: 'Фамилия',
              nullable: true,
            },
            patronymicName: {
              type: 'string',
              description: 'Отчество',
              nullable: true,
            },
            phone: {
              type: 'string',
              description: 'Телефон',
              nullable: true,
            },
            country: {
              type: 'string',
              description: 'Страна',
              nullable: true,
            },
            age: {
              type: 'number',
              description: 'Возраст',
              nullable: true,
            },
          },
          required: ['shopGuid', 'email', 'password', 'firstName'],
        },
      },
    },
    required: ['administrators'],
  },
  response: {
    201: {
      type: 'object',
      description: 'Администраторы успешно созданы',
      properties: {
        data: {
          type: 'object',
          properties: {
            administrators: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  shopGuid: { type: 'string', description: 'UUID магазина' },
                  userGuid: { type: 'string', description: 'UUID пользователя' },
                  user: {
                    type: 'object',
                    properties: {
                      guid: { type: 'string' },
                      email: { type: 'string' },
                      firstName: { type: 'string' },
                      lastName: { type: ['string', 'null'] },
                      patronymicName: { type: ['string', 'null'] },
                      phone: { type: ['string', 'null'] },
                      country: { type: ['string', 'null'] },
                      age: { type: ['number', 'null'] },
                    },
                  },
                },
              },
            },
            count: { type: 'number', description: 'Количество созданных администраторов' },
          },
        },
      },
    },
  },
} as const;
