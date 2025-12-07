import { httpTransport } from '#Infrastructure/fastify';
import { find as findUser } from '../repositories/find';
import { GetSchema } from '../schemas/get';

httpTransport.handler.get('/api/user/v1/:guid', GetSchema, async (request) => {
  const user = await findUser(request.params);
  return { data: user };
});
