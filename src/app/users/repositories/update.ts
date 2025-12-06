import User, { UserAttributes } from '#App/users/models/user.model';
import UserRole from '#App/userRoles/models/userRole.model';
import { UpdateOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';

type UpdateUserData = {
  email?: UserAttributes['email'];
  firstName?: UserAttributes['firstName'];
  lastName?: UserAttributes['lastName'];
  patronymicName?: UserAttributes['patronymicName'];
  phone?: UserAttributes['phone'];
  country?: UserAttributes['country'];
  age?: UserAttributes['age'];
}

export async function update(
  guid: string,
  data: UpdateUserData,
  repOptions?: UpdateOptions
) {
  const options = repOptions || {};

  await User.update(data, {
    ...options,
    where: { guid },
  } as UpdateOptions);

  const updatedUser = await User.findOne({
    where: { guid },
    attributes: { exclude: ['password'] },
    include: [
      {
        model: UserRole,
        as: 'roles',
        through: { attributes: [] },
      },
    ],
    ...options,
  });

  return plainify(updatedUser!);
}
