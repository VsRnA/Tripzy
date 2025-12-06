import { QueryInterface } from 'sequelize';
import { ROLES } from '#Shared/roles';

const tableName = 'userRoles';

/**
 * Миграция для заполнения таблицы userRoles начальными ролями
 * Создается только роль TOURIST без привязки к клиенту
 * Роли для организаций (clientAdmin, shopAdmin) будут создаваться в seedTestData для каждого клиента
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const roles = [
      {
        name: ROLES.TOURIST.name,
        keyWord: ROLES.TOURIST.keyWord,
        clientGuid: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(tableName, roles, {});
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(
      tableName,
      {
        keyWord: ROLES.TOURIST.keyWord,
        clientGuid: null,
      } as any,
      {}
    );
  },
};
