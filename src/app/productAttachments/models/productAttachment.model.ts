import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Product from '#App/products/models/product.model';

export type ProductAttachmentAttributes = Attributes<ProductAttachment>;
export type ProductAttachmentCreationAttributes = CreationAttributes<ProductAttachment>;

export default class ProductAttachment extends Model<InferAttributes<ProductAttachment>, InferCreationAttributes<ProductAttachment>> {
  /** GUID продукта */
  declare productGuid: string;
  /** GUID вложения */
  declare attachmentGuid: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

ProductAttachment.init({
  productGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'guid',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  attachmentGuid: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'productAttachments',
  modelName: 'productAttachment',
  timestamps: true,
});

db.associate(() => {
  ProductAttachment.belongsTo(Product, {
    foreignKey: 'productGuid',
    as: 'product',
  });
});
