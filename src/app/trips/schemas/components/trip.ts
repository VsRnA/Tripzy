export const TripGoalEnum = ['forSelf', 'forColleagues', 'forRelatives', 'forFriends'] as const;

export const TripSchema = {
  type: 'object',
  properties: {
    guid: { type: 'string', description: 'Уникальный идентификатор поездки' },
    name: { type: 'string', minLength: 1, maxLength: 255, description: 'Название поездки' },
    goal: { type: 'string', enum: TripGoalEnum, description: 'Цель поездки' },
    status: { type: 'string', description: 'Статус поездки' },
    budgetMin: { type: 'number', minimum: 0, nullable: true, description: 'Минимальный бюджет' },
    budgetMax: { type: 'number', minimum: 0, nullable: true, description: 'Максимальный бюджет' },
    removalMark: { type: 'boolean', description: 'Пометка на удаление' },
    createdAt: { type: 'string', description: 'Дата создания' },
    updatedAt: { type: 'string', description: 'Дата обновления' },
  },
} as const;
