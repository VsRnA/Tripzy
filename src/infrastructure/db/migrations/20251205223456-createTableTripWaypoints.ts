import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'tripWaypoints';

/**
 * Миграция для создания таблицы tripWaypoints
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
      tripGuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'trips',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      visitDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(tableName);
  },
};
