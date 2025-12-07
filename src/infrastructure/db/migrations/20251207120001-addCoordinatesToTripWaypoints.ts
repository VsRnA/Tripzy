import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'tripWaypoints';

/**
 * Миграция для добавления координат (широта и долгота) в таблицу tripWaypoints
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn(tableName, 'latitude', {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      comment: 'Широта точки маршрута',
    });

    await queryInterface.addColumn(tableName, 'longitude', {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      comment: 'Долгота точки маршрута',
    });

    // Создаем индекс для быстрого поиска по координатам
    await queryInterface.addIndex(tableName, ['latitude', 'longitude'], {
      name: 'idx_trip_waypoints_coordinates',
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeIndex(tableName, 'idx_trip_waypoints_coordinates');
    await queryInterface.removeColumn(tableName, 'longitude');
    await queryInterface.removeColumn(tableName, 'latitude');
  },
};
