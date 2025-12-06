import { httpTransport } from '#Infrastructure/fastify';
import { LoginSchema } from '../schemas/login';
import { find as findUser } from '../repositories/find';
import { comparePassword } from '#Shared/password';
import { signJwt } from '#Shared/jwt';
import { UnauthorizedError } from '#Lib/errors';

httpTransport.handler.post('/api/auth/v1/login', LoginSchema, async (request) => {
  const { email, password } = request.payload;

  const { password: userPassword, ...userData} = await findUser({ email, includePassword: true })
  const isPasswordValid = await comparePassword(password, userPassword);
  if (!isPasswordValid) {
    throw new UnauthorizedError('User', { email });
  }

  const token = signJwt({ userGuid: userData.guid });

  return { data: { user: userData, token } };
}, { authOnly: false });
