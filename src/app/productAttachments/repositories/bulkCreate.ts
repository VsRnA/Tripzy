import ProductAttachment, { ProductAttachmentCreationAttributes } from '../models/productAttachment.model';
import { BulkCreateOptions } from 'sequelize';

export async function bulkCreate(
  data: ProductAttachmentCreationAttributes[],
  options?: BulkCreateOptions,
): Promise<ProductAttachment[]> {
  return ProductAttachment.bulkCreate(data, options);
}
