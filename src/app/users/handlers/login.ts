import { httpTransport } from '#Infrastructure/fastify';
import { UnauthorizedError } from '#Lib/errors';
import { signJwt } from '#Shared/jwt';
import { comparePassword } from '#Shared/password';
import { find as findUser } from '../repositories/find';
import { LoginSchema } from '../schemas/login';

httpTransport.handler.post('/api/auth/v1/login', LoginSchema, async (request) => {
  const { email, password } = request.payload;

  const { password: userPassword, ...userData } = await findUser({ email, includePassword: true });
  const isPasswordValid = await comparePassword(password, userPassword);
  if (!isPasswordValid) {
    throw new UnauthorizedError('User', { email });
  }

  const token = signJwt({ userGuid: userData.guid });

  return { data: { user: userData, token } };
}, { authOnly: false });
