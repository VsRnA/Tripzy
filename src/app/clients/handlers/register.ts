import { httpTransport } from '#Infrastructure/fastify';
import { RegisterClientSchema } from '../schemas/register';
import { create as createClient } from '../repositories/create';
import { get as getClient } from '../repositories/get';
import { generateApiKey } from '#Shared/apiKey';
import { EntityAlreadyExistedError } from '#Lib/errors';

httpTransport.handler.post('/api/clients/v1/register', RegisterClientSchema, async (request) => {
  const { name } = request.payload;

  const existingClient = await getClient({ name });
  if (existingClient) {
    throw new EntityAlreadyExistedError('Client', { name });
  }

  const apiKey = generateApiKey();

  const client = await createClient({
    name,
    apiKey,
  });

  return { data: { client } };
}, { authOnly: false });