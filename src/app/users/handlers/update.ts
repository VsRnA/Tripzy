import { httpTransport } from '#Infrastructure/fastify';
import { update as updateUser } from '../repositories/update';
import { UpdateUserSchema } from '../schemas/update';

httpTransport.handler.put('/api/users/v1/me', UpdateUserSchema, async (request) => {
  const userGuid = request.context.user!.guid;
  const updatedData = request.payload;

  const updatedUser = await updateUser(userGuid, updatedData);

  return { data: updatedUser };
});
