import User, { UserCreationAttributes } from '#App/users/models/user.model';
import { CreateOptions } from 'sequelize';

export async function create(data: UserCreationAttributes, repOptions?: CreateOptions): Promise<User> {
  return User.create(data, repOptions);
}

