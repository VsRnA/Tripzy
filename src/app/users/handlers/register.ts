import { httpTransport } from '#Infrastructure/fastify';
import { RegisterSchema } from '../schemas/register';
import { create as createUser } from '../repositories/create';
import { get as getUser } from '../repositories/get';
import { get as getUserRole } from '#App/userRoles/repositories/get';
import { create as createUserRoleAssignment } from '#App/userRoleAssignments/repositories/create';
import { find as findUser } from '../repositories/find';
import { find as findRole } from '../../userRoles/repositories/find';
import { hashPassword } from '#Shared/password';
import { signJwt } from '#Shared/jwt';
import { ROLES } from '#Shared/roles';
import { EntityAlreadyExistedError } from '#Lib/errors';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post('/api/auth/v1/registration', RegisterSchema, async (request) => {
  const { email, password, firstName } = request.payload;

  const existingUser = await getUser({ email });
  if (existingUser) {
    throw new EntityAlreadyExistedError('User', { email });
  }

  const hashedPassword = await hashPassword(password);

  const { user, token } = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction };

    const userRole = await findRole({ keyWord: ROLES.USER.keyWord }, repOptions);

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
