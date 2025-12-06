
import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'shops';

/**
 * Координаты центров российских городов
 * Формат: { city: string, latitude: number, longitude: number, radius: number }
 * radius - примерный радиус города в градусах для генерации случайных координат
 */
const citiesCoordinates = [
  { city: 'Москва', latitude: 55.7558, longitude: 37.6173, radius: 0.3 },
  { city: 'Санкт-Петербург', latitude: 59.9311, longitude: 30.3609, radius: 0.3 },
  { city: 'Казань', latitude: 55.7887, longitude: 49.1221, radius: 0.2 },
  { city: 'Екатеринбург', latitude: 56.8389, longitude: 60.6057, radius: 0.2 },
  { city: 'Новосибирск', latitude: 55.0084, longitude: 82.9357, radius: 0.2 },
  { city: 'Нижний Новгород', latitude: 56.2965, longitude: 43.9361, radius: 0.2 },
  { city: 'Краснодар', latitude: 45.0355, longitude: 38.9753, radius: 0.15 },
  { city: 'Владивосток', latitude: 43.1155, longitude: 131.8855, radius: 0.15 },
];

/**
 * Миграция для добавления координат (широта и долгота) в таблицу shops
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Добавляем колонки как nullable временно
    await queryInterface.addColumn(tableName, 'latitude', {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      comment: 'Широта магазина',
    });

    await queryInterface.addColumn(tableName, 'longitude', {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      comment: 'Долгота магазина',
    });

    // Заполняем существующие записи координатами для каждого города
    for (const cityData of citiesCoordinates) {
      await queryInterface.sequelize.query(`
        UPDATE ${tableName}
        SET
          latitude = ${cityData.latitude} + (RANDOM() * ${cityData.radius * 2} - ${cityData.radius}),
          longitude = ${cityData.longitude} + (RANDOM() * ${cityData.radius * 2} - ${cityData.radius})
        WHERE city = '${cityData.city}' AND (latitude IS NULL OR longitude IS NULL)
      `);
    }

    // Заполняем оставшиеся записи случайными координатами в пределах России
    // (на случай, если есть города не из списка)
    await queryInterface.sequelize.query(`
      UPDATE ${tableName}
      SET
        latitude = 55 + (RANDOM() * 10 - 5),
        longitude = 37 + (RANDOM() * 20 - 10)
      WHERE latitude IS NULL OR longitude IS NULL
    `);

    // Делаем колонки обязательными
    await queryInterface.changeColumn(tableName, 'latitude', {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      comment: 'Широта магазина',
    });

    await queryInterface.changeColumn(tableName, 'longitude', {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      comment: 'Долгота магазина',
    });

    // Создаем индекс для быстрого поиска по координатам
    await queryInterface.addIndex(tableName, ['latitude', 'longitude'], {
      name: 'idx_shops_coordinates',
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeIndex(tableName, 'idx_shops_coordinates');
    await queryInterface.removeColumn(tableName, 'longitude');
    await queryInterface.removeColumn(tableName, 'latitude');
  },
};
