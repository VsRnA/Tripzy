import { BulkCreateOptions } from 'sequelize';
import ProductAttachment, { ProductAttachmentCreationAttributes } from '../models/productAttachment.model';

export async function bulkCreate(
  data: ProductAttachmentCreationAttributes[],
  options?: BulkCreateOptions,
): Promise<ProductAttachment[]> {
  return ProductAttachment.bulkCreate(data, options);
}
