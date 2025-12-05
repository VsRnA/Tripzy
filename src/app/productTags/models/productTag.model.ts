import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Product from '#App/products/models/product.model';

export enum ProductTagEnum {
  CHILDREN = 'children',
  RELATIVES = 'relatives',
  COLLEAGUES = 'colleagues',
  FRIENDS = 'friends',
  PARTNER = 'partner',
  PARENTS = 'parents',
  MYSELF = 'myself',
  OTHER = 'other',
}

export type ProductTagAttributes = Attributes<ProductTag>;
export type ProductTagCreationAttributes = CreationAttributes<ProductTag>;

export default class ProductTag extends Model<InferAttributes<ProductTag>, InferCreationAttributes<ProductTag>> {
  /** UUID продукта */
  declare productGuid: string;
  /** Тег продукта для системы рекомендаций */
  declare tag: ProductTagEnum;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

ProductTag.init({
  productGuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  tag: {
    type: DataTypes.ENUM(...Object.values(ProductTagEnum)),
    allowNull: false,
    primaryKey: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'productTags',
  modelName: 'productTag',
  timestamps: true,
});

db.associate(() => {
  ProductTag.belongsTo(Product, {
    foreignKey: 'productGuid',
    targetKey: 'guid',
    as: 'product',
  });
});
