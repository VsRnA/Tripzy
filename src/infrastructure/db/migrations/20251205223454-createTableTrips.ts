import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'trips';

/**
 * Миграция для создания таблицы trips
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable(tableName, {
      guid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      goal: {
        type: DataTypes.ENUM('forSelf', 'forColleagues', 'forRelatives', 'forFriends'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('planned', 'active', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'planned',
      },
      budgetMin: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      budgetMax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      removalMark: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(tableName);
  },
};
