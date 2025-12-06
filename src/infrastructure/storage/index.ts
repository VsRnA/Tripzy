import { S3Storage } from '#Lib/storage/s3Storage';
import { config } from '#Shared/config';

export const s3Storage = new S3Storage(config.s3);
