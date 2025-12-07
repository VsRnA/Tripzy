import { httpTransport } from '#Infrastructure/fastify';
import { list as listUsers } from '../repositories/list';
import { ListSchema } from '../schemas/list';

httpTransport.handler.get('/api/user/v1/list', ListSchema, async (request) => {
  const users = await listUsers(request.query);
  return { data: users };
});
