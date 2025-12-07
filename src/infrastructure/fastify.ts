import { authHook } from '#Infrastructure/hooks';
import { FastifyHttpTransport } from '#Lib/http/fastify';
import { config } from '#Shared/config';

export const httpTransport = new FastifyHttpTransport({
  port: config.http.port,
  host: config.http.host,
  logger: config.logger,
});

httpTransport.hooks.registerGlobal('preHandler', 'auth', authHook);
