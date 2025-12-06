import { httpTransport } from '#Infrastructure/fastify';
import { UpdateUserSchema } from '../schemas/update';
import { update as updateUser } from '../repositories/update';

httpTransport.handler.put('/api/users/v1/me', UpdateUserSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const updatedData = request.payload;

  const updatedUser = await updateUser(userGuid, updatedData);

  return { data: updatedUser };
});
