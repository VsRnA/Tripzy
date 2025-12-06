import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'productAttributes';

/**
 * Миграция для добавления поля isCulture в таблицу productAttributes
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn(tableName, 'isCulture', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn(tableName, 'isCulture');
  },
};
