export const ShopSchema = {
  type: 'object',
  properties: {
    guid: { type: 'string', description: 'UUID магазина' },
    clientGuid: { type: 'string', description: 'UUID клиента' },
    name: { type: 'string', description: 'Название магазина' },
    address: { type: 'string', description: 'Адрес магазина' },
    city: { type: 'string', description: 'Город' },
    region: { type: 'string', description: 'Регион' },
    schedule: { type: 'object', description: 'Расписание работы', nullable: true },
    latitude: { type: 'number', description: 'Широта магазина' },
    longitude: { type: 'number', description: 'Долгота магазина' },
    removalMark: { type: 'boolean', description: 'Пометка на удаление' },
    createdAt: { type: 'string', description: 'Дата создания' },
    updatedAt: { type: 'string', description: 'Дата обновления' },
  },
} as const;
