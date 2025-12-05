import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'productAttachments';

/**
 * Миграция для создания таблицы productAttachments (связь products и attachments)
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable(tableName, {
      productGuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'products',
          key: 'guid',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      attachmentGuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
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
