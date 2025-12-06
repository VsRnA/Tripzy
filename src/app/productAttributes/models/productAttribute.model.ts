import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Product from '#App/products/models/product.model';

export enum ProductAttributeTypeEnum {
  TAG = 'tag',
  CRAFT_TYPE = 'craftType',
  MATERIAL = 'material',
}

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

export enum ProductCraftTypeEnum {
  FOLK_CRAFTS = 'folkCrafts',
  HAND_MADE = 'handMade',
  ARTISTIC_CRAFTS = 'artisticCrafts',
  TRADITIONAL_CRAFTS = 'traditionalCrafts',
  SOUVENIRS = 'souvenirs',
  JEWELRY = 'jewelry',
  TEXTILE = 'textile',
  CERAMICS = 'ceramics',
  WOOD_WORKING = 'woodWorking',
  METALWORK = 'metalwork',
}

export enum ProductMaterialEnum {
  WOOD = 'wood',
  METAL = 'metal',
  GLASS = 'glass',
  CERAMIC = 'ceramic',
  TEXTILE = 'textile',
  LEATHER = 'leather',
  STONE = 'stone',
  PLASTIC = 'plastic',
  PAPER = 'paper',
  MIXED = 'mixed',
}

export type ProductAttributeAttributes = Attributes<ProductAttribute>;
export type ProductAttributeCreationAttributes = CreationAttributes<ProductAttribute>;

export default class ProductAttribute extends Model<InferAttributes<ProductAttribute>, InferCreationAttributes<ProductAttribute>> {
  /** UUID продукта */
  declare productGuid: string;
  /** Тип атрибута */
  declare type: ProductAttributeTypeEnum;
  /** Значение атрибута */
  declare value: ProductTagEnum | ProductCraftTypeEnum | ProductMaterialEnum;
  /** Признак привязки к культуре региона */
  declare isCulture: CreationOptional<boolean>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

ProductAttribute.init({
  productGuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM(...Object.values(ProductAttributeTypeEnum)),
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isCulture: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'productAttributes',
  modelName: 'productAttribute',
  timestamps: true,
});

db.associate(() => {
  ProductAttribute.belongsTo(Product, {
    foreignKey: 'productGuid',
    targetKey: 'guid',
    as: 'product',
  });
});
