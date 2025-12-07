import { httpTransport } from '#Infrastructure/fastify';
import db from '#Infrastructure/sequelize';
import { EntityAlreadyExistedError } from '#Lib/errors';
import { signJwt } from '#Shared/jwt';
import { hashPassword } from '#Shared/password';
import { ROLES } from '#Shared/roles';
import { create as createUserRoleAssignment } from '#App/userRoleAssignments/repositories/create';
import { get as getUserRole } from '#App/userRoles/repositories/get';
import { find as findRole } from '../../userRoles/repositories/find';
import { create as createUser } from '../repositories/create';
import { find as findUser } from '../repositories/find';
import { get as getUser } from '../repositories/get';
import { RegisterSchema } from '../schemas/register';

httpTransport.handler.post('/api/auth/v1/registration', RegisterSchema, async (request) => {
  const { email, password, firstName } = request.payload;

  const existingUser = await getUser({ email });
  if (existingUser) {
    throw new EntityAlreadyExistedError('User', { email });
  }

  const hashedPassword = await hashPassword(password);

  const { user, token } = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction };

    const userRole = await findRole({ keyWord: ROLES.TOURIST.keyWord, clientGuid: null }, repOptions);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      firstName,
    }, repOptions);

    await createUserRoleAssignment({
      userGuid: newUser.guid,
      roleId: userRole.id,
    }, repOptions);

    const userWithRoles = await findUser({ guid: newUser.guid }, repOptions);

    const token = signJwt({ userGuid: userWithRoles.guid });

    return { user: userWithRoles, token };
  });

  return { data: { user, token } };
}, { authOnly: false });
