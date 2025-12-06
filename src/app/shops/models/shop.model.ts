import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Client from '#App/clients/models/client.model';
import ShopAdministrator from '#App/shopAdministrators/models/shopAdministrator.model';
import Product from '#App/products/models/product.model';

export type ShopSchedule = {
  [day: string]: string;
};

export type ShopAttributes = Attributes<Shop>;
export type ShopCreationAttributes = CreationAttributes<Shop>;

export default class Shop extends Model<InferAttributes<Shop>, InferCreationAttributes<Shop>> {
  /** UUID магазина */
  declare guid: CreationOptional<string>;
  /** UUID клиента */
  declare clientGuid: string;
  /** Название магазина */
  declare name: string;
  /** Адрес магазина */
  declare address: string;
  /** Город */
  declare city: string;
  /** Регион */
  declare region: string;
  /** Расписание работы (например: {"monday": "9:00-18:00", "tuesday": "9:00-18:00"}) */
  declare schedule: ShopSchedule | null;
  /** Широта магазина */
  declare latitude: number;
  /** Долгота магазина */
  declare longitude: number;
  /** Пометка на удаление */
  declare removalMark: CreationOptional<boolean>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

Shop.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  clientGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
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
  tableName: 'shops',
  modelName: 'shop',
  timestamps: true,
});

db.associate(() => {
  Shop.belongsTo(Client, {
    foreignKey: 'clientGuid',
    targetKey: 'guid',
    as: 'client',
  });

  Shop.hasMany(ShopAdministrator, {
    foreignKey: 'shopGuid',
    as: 'administrators',
  });

  Shop.hasMany(Product, {
    foreignKey: 'shopGuid',
    as: 'products',
  });
});
