import { QueryInterface, DataTypes } from 'sequelize';

const oldTableName = 'productTags';
const newTableName = 'productAttributes';

/**
 * Миграция для преобразования таблицы productTags в productAttributes
 * с добавлением типов атрибутов и заполнением тестовыми данными
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // 1. Создаем новую таблицу productAttributes
    await queryInterface.createTable(newTableName, {
      productGuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      type: {
        type: DataTypes.ENUM('tag', 'craftType', 'material'),
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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

    // 2. Мигрируем данные из старой таблицы в новую (теги становятся атрибутами типа 'tag')
    await queryInterface.sequelize.query(`
      INSERT INTO "${newTableName}" ("productGuid", "type", "value", "createdAt", "updatedAt")
      SELECT "productGuid", 'tag', "tag", "createdAt", "updatedAt"
      FROM "${oldTableName}"
    `);

    // 3. Получаем список всех продуктов для добавления тестовых данных
    const [products]: any = await queryInterface.sequelize.query(
      'SELECT guid FROM products LIMIT 10',
    );

    // 4. Добавляем тестовые данные для типов ремесел
    const craftTypes = [
      'folkCrafts',
      'handMade',
      'artisticCrafts',
      'traditionalCrafts',
      'souvenirs',
      'jewelry',
      'textile',
      'ceramics',
      'woodWorking',
      'metalwork',
    ];

    const materials = [
      'wood',
      'metal',
      'glass',
      'ceramic',
      'textile',
      'leather',
      'stone',
      'plastic',
      'paper',
      'mixed',
    ];

    // Добавляем по одному craft_type и material для каждого продукта
    for (let i = 0; i < products.length && i < 10; i++) {
      const product = products[i];
      const craftType = craftTypes[i % craftTypes.length];
      const material = materials[i % materials.length];

      // Добавляем тип ремесла
      await queryInterface.bulkInsert(newTableName, [{
        productGuid: product.guid,
        type: 'craftType',
        value: craftType,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);

      // Добавляем материал
      await queryInterface.bulkInsert(newTableName, [{
        productGuid: product.guid,
        type: 'material',
        value: material,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    }

    // 5. Удаляем старую таблицу
    await queryInterface.dropTable(oldTableName);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // 1. Создаем обратно старую таблицу productTags
    await queryInterface.createTable(oldTableName, {
      productGuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tag: {
        type: DataTypes.ENUM(
          'children',
          'relatives',
          'colleagues',
          'friends',
          'partner',
          'parents',
          'myself',
          'other',
        ),
        allowNull: false,
        primaryKey: true,
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

    // 2. Мигрируем обратно только теги
    await queryInterface.sequelize.query(`
      INSERT INTO "${oldTableName}" ("productGuid", "tag", "createdAt", "updatedAt")
      SELECT "productGuid", "value", "createdAt", "updatedAt"
      FROM "${newTableName}"
      WHERE "type" = 'tag'
    `);

    // 3. Удаляем новую таблицу
    await queryInterface.dropTable(newTableName);
  },
};
