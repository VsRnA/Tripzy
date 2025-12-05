import { QueryInterface } from 'sequelize';
import { ALL_ROLES } from '#Shared/roles';

const tableName = 'userRoles';

/**
 * Миграция для заполнения таблицы userRoles начальными ролями
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const roles = ALL_ROLES.map((role) => ({
      name: role.name,
      keyWord: role.keyWord,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert(tableName, roles, {});
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    const keyWords = ALL_ROLES.map((role) => role.keyWord);

    await queryInterface.bulkDelete(tableName, {
      keyWord: keyWords,
    } as any, {});
  },
};
