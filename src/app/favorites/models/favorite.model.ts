import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import User from '#App/users/models/user.model';
import Product from '#App/products/models/product.model';

export type FavoriteAttributes = Attributes<Favorite>;
export type FavoriteCreationAttributes = CreationAttributes<Favorite>;

export default class Favorite extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
  /** UUID пользователя */
  declare userGuid: string;
  /** UUID продукта */
  declare productGuid: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

Favorite.init({
  userGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  productGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'favorites',
  modelName: 'favorite',
  timestamps: true,
});

db.associate(() => {
  Favorite.belongsTo(User, {
    foreignKey: 'userGuid',
    targetKey: 'guid',
    as: 'user',
  });

  Favorite.belongsTo(Product, {
    foreignKey: 'productGuid',
    targetKey: 'guid',
    as: 'product',
  });
});
