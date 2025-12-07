export const schema = {
  type: 'object',
  properties: {
    HTTP_HOST: {
      type: 'string',
      default: '0.0.0.0',
      description: 'HTTP хост',
    },
    HTTP_PORT: {
      type: 'number',
      default: 3000,
      description: 'HTTP порт',
    },
    POSTGRES_USER: {
      type: 'string',
      default: 'postgres',
      description: 'Имя пользователя PostgreSQL',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
      description: 'Пароль пользователя PostgreSQL',
    },
    POSTGRES_DB: {
      type: 'string',
      default: 'iPostgres',
      description: 'Название базы данных PostgreSQL',
    },
    POSTGRES_HOST: {
      type: 'string',
      default: 'postgres',
      description: 'Хост PostgreSQL (имя сервиса в Docker или localhost)',
    },
    POSTGRES_PORT: {
      type: 'number',
      default: 5432,
      description: 'Порт PostgreSQL',
    },
    JWT_SECRET: {
      type: 'string',
      description: 'JWT secret',
    },
    S3_ENDPOINT: {
      type: 'string',
      description: 'S3 endpoint URL (Timeweb Cloud)',
    },
    S3_REGION: {
      type: 'string',
      default: 'ru-1',
      description: 'S3 region',
    },
    S3_ACCESS_KEY_ID: {
      type: 'string',
      description: 'S3 access key ID',
    },
    S3_SECRET_ACCESS_KEY: {
      type: 'string',
      description: 'S3 secret access key',
    },
    S3_BUCKET: {
      type: 'string',
      description: 'S3 bucket name',
    },
  },
  required: [
    'HTTP_HOST',
    'HTTP_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'JWT_SECRET',
    'S3_ENDPOINT',
    'S3_REGION',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_BUCKET',
  ],
} as const;
