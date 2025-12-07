import { httpTransport } from '#Infrastructure/fastify';
import { EntityAlreadyExistedError } from '#Lib/errors';
import { generateApiKey } from '#Shared/apiKey';
import { create as createClient } from '../repositories/create';
import { get as getClient } from '../repositories/get';
import { RegisterClientSchema } from '../schemas/register';

httpTransport.handler.post('/api/clients/v1/register', RegisterClientSchema, async (request) => {
  const { name } = request.payload;

  const existingClient = await getClient({ name });
  if (existingClient) {
    throw new EntityAlreadyExistedError('Client', { name });
  }

  const client = await createClient({
    name,
    apiKey: generateApiKey(),
  });

  return { data: { client } };
}, { authOnly: false });
