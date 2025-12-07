import { s3Storage } from '#Infrastructure/storage';

/**
 * Генерирует публичный URL для вложения товара
 * @param productGuid - UUID продукта
 * @param attachmentGuid - UUID вложения
 * @returns публичный URL для доступа к изображению
 */
export function generateAttachmentUrl(productGuid: string, attachmentGuid: string): string {
  const key = `products/${productGuid}/${attachmentGuid}`;
  return s3Storage.getPublicUrl(key);
}
