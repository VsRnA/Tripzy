import { env } from '#Infrastructure/env';
import { httpTransport } from '#Infrastructure/fastify';
import db from '#Infrastructure/sequelize';
import '#Infrastructure/routes';

async function bootstrap() {
  try {
    env.init();
    await db.connectDatabase();
    await httpTransport.start();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();
