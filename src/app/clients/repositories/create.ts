import { CreateOptions } from 'sequelize';
import Client, { ClientCreationAttributes } from '#App/clients/models/client.model';

export async function create(data: ClientCreationAttributes, repOptions?: CreateOptions): Promise<Client> {
  return Client.create(data, repOptions);
}
