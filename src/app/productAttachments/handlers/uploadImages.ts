import { httpTransport } from '#Infrastructure/fastify';
import { UploadProductImagesSchema } from '../schemas/uploadImages';
import { bulkCreate as bulkCreateAttachments } from '../repositories/bulkCreate';
import { find as findProduct } from '#App/products/repositories/find';
import { find as findClient } from '#App/clients/repositories/find';
import { get as getShop } from '#App/shops/repositories/get';
import { UnauthorizedError, NotFoundError, BadRequestError } from '#Lib/errors';
import { s3Storage } from '#Infrastructure/storage';
import db from '#Infrastructure/sequelize';
import { randomUUID } from 'crypto';
import { MultipartFile } from '@fastify/multipart';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  filename: string;
}

httpTransport.handler.post(
  '/api/clients/v1/products/:productGuid/images',
  UploadProductImagesSchema,
  async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new UnauthorizedError('API key is required');
    }

    const client = await findClient({ apiKey });
    const { productGuid } = request.params as { productGuid: string };

    const product = await findProduct({ guid: productGuid });

    const shop = await getShop({ guid: product.shopGuid });
    if (!shop || shop.clientGuid !== client.guid) {
      throw new NotFoundError('Product', { guid: productGuid });
    }

    const parts = request.parts();
    const uploadedFiles: UploadedFile[] = [];

    for await (const part of parts) {
      if (part.type === 'file') {
        const file = part as MultipartFile;

        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          throw new BadRequestError(
            `Invalid file type: ${file.mimetype}. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
          );
        }

        const buffer = await file.toBuffer();

        if (buffer.length > MAX_FILE_SIZE) {
          throw new BadRequestError(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }

        uploadedFiles.push({
          buffer,
          mimetype: file.mimetype,
          filename: file.filename,
        });
      }
    }

    if (uploadedFiles.length === 0) {
      throw new BadRequestError('No files uploaded');
    }

    const result = await db.runInTransaction(async (transaction) => {
      const attachmentsData = [];

      for (const file of uploadedFiles) {
        const attachmentGuid = randomUUID();
        const ext = file.mimetype.split('/')[1];
        const key = `products/${productGuid}/${attachmentGuid}.${ext}`;

        await s3Storage.uploadFile({
          key,
          buffer: file.buffer,
          contentType: file.mimetype,
        });

        attachmentsData.push({
          productGuid,
          attachmentGuid,
        });
      }

      const attachments = await bulkCreateAttachments(attachmentsData, { transaction });

      const attachmentsWithUrls = attachments.map((attachment, index) => {
        const ext = uploadedFiles[index].mimetype.split('/')[1];
        const key = `products/${productGuid}/${attachment.attachmentGuid}.${ext}`;
        return {
          ...attachment.toJSON(),
          url: s3Storage.getPublicUrl(key),
        };
      });

      return attachmentsWithUrls;
    });

    return { data: { attachments: result, count: result.length } };
  },
  { authOnly: false },
);
