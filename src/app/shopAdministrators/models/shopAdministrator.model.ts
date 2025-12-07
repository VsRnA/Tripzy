import db from '#Infrastructure/sequelize';
import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import Shop from '#App/shops/models/shop.model';
import User from '#App/users/models/user.model';

export type ShopAdministratorAttributes = Attributes<ShopAdministrator>;
export type ShopAdministratorCreationAttributes = CreationAttributes<ShopAdministrator>;

export default class ShopAdministrator extends Model<InferAttributes<ShopAdministrator>, InferCreationAttributes<ShopAdministrator>> {
  /** GUID магазина */
  declare shopGuid: string;
  /** GUID пользователя */
  declare userGuid: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

ShopAdministrator.init({
  shopGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Shop,
      key: 'guid',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'guid',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'shopAdministrators',
  modelName: 'shopAdministrator',
  timestamps: true,
});

db.associate(() => {
  ShopAdministrator.belongsTo(Shop, {
    foreignKey: 'shopGuid',
    as: 'shop',
  });

  ShopAdministrator.belongsTo(User, {
    foreignKey: 'userGuid',
    as: 'user',
  });
});
