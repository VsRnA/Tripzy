import { QueryInterface, DataTypes } from 'sequelize';

const tableName = 'tripWaypoints';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn(tableName, 'parentGuid', {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: tableName,
        key: 'guid',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn(tableName, 'type', {
      type: DataTypes.ENUM('city', 'attraction'),
      allowNull: false,
      defaultValue: 'city',
    });

  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn(tableName, 'type');
    await queryInterface.removeColumn(tableName, 'parentGuid');
  },
};
