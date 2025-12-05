import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import User from '#App/users/models/user.model';
import Shop from '#App/shops/models/shop.model';

export type ClientAttributes = Attributes<Client>;
export type ClientCreationAttributes = CreationAttributes<Client>;

export default class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
  /** Автоинкрементный ID клиента */
  declare id: CreationOptional<number>;
  /** UUID клиента */
  declare guid: CreationOptional<string>;
  /** Название клиента */
  declare name: string;
  /** API ключ клиента */
  declare apiKey: string;
  /** Пометка на удаление */
  declare removalMark: CreationOptional<boolean>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

Client.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  guid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  removalMark: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'clients',
  modelName: 'client',
  timestamps: true,
});

db.associate(() => {
  Client.hasMany(User, {
    foreignKey: 'clientId',
    as: 'users',
  });

  Client.hasMany(Shop, {
    foreignKey: 'clientGuid',
    sourceKey: 'guid',
    as: 'shops',
  });
});
