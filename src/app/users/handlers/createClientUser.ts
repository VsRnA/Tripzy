import { httpTransport } from '#Infrastructure/fastify';
import db from '#Infrastructure/sequelize';
import { EntityAlreadyExistedError, UnauthorizedError } from '#Lib/errors';
import { signJwt } from '#Shared/jwt';
import { hashPassword } from '#Shared/password';
import { find as findClient } from '#App/clients/repositories/find';
import { create as createUserRoleAssignment } from '#App/userRoleAssignments/repositories/create';
import { find as findRole } from '#App/userRoles/repositories/find';
import { create as createUser } from '../repositories/create';
import { find as findUser } from '../repositories/find';
import { get as getUser } from '../repositories/get';
import { CreateClientUserSchema } from '../schemas/createClientUser';

httpTransport.handler.post('/api/clients/v1/users', CreateClientUserSchema, async (request) => {
  const apiKey = request.headers['x-api-key'] as string;

  if (!apiKey) {
    throw new UnauthorizedError('API key is required');
  }

  const client = await findClient({ apiKey });

  const {
    email,
    password,
    firstName,
    lastName,
    patronymicName,
    phone,
    country,
    age,
    roleKeyWord,
  } = request.payload;

  const existingUser = await getUser({ email });
  if (existingUser) {
    throw new EntityAlreadyExistedError('User', { email });
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction };

    const userRole = await findRole({ keyWord: roleKeyWord, clientGuid: client.guid }, repOptions);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName ?? null,
      patronymicName: patronymicName ?? null,
      phone: phone ?? null,
      country: country ?? null,
      age: age ?? null,
      clientGuid: client.guid,
    }, repOptions);

    await createUserRoleAssignment({
      userGuid: newUser.guid,
      roleId: userRole.id,
    }, repOptions);

    const userWithRoles = await findUser({ guid: newUser.guid }, repOptions);

    return userWithRoles;
  });

  const token = signJwt({ userGuid: user.guid });

  return { data: { user, token } };
}, { authOnly: false });
