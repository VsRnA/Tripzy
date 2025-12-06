import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'userRoles';

/**
 * Миграция для создания таблицы userRoles
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyWord: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientGuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'clients',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(tableName);
  },
};
