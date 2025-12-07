import { CreateOptions } from 'sequelize';
import User, { UserCreationAttributes } from '#App/users/models/user.model';

export async function create(data: UserCreationAttributes, repOptions?: CreateOptions): Promise<User> {
  return User.create(data, repOptions);
}

