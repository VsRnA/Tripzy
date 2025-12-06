import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Shop from '#App/shops/models/shop.model';
import ProductAttachment from '#App/productAttachments/models/productAttachment.model';
import ProductAttribute from '#App/productAttributes/models/productAttribute.model';

export type ProductAttributes = Attributes<Product>;
export type ProductCreationAttributes = CreationAttributes<Product>;

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  /** UUID продукта */
  declare guid: CreationOptional<string>;
  /** UUID магазина */
  declare shopGuid: string;
  /** Название продукта */
  declare name: string;
  /** Цена продукта */
  declare price: number;
  /** Количество продукта на складе */
  declare quantity: CreationOptional<number>;
  /** Пометка на удаление */
  declare removalMark: CreationOptional<boolean>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

Product.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  shopGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  tableName: 'products',
  modelName: 'product',
  timestamps: true,
});

db.associate(() => {
  Product.belongsTo(Shop, {
    foreignKey: 'shopGuid',
    targetKey: 'guid',
    as: 'shop',
  });

  Product.hasMany(ProductAttachment, {
    foreignKey: 'productGuid',
    as: 'attachments',
  });

  Product.hasMany(ProductAttribute, {
    foreignKey: 'productGuid',
    as: 'attributes',
  });
});
