import Client, { ClientCreationAttributes } from '#App/clients/models/client.model';
import { CreateOptions } from 'sequelize';

export async function create(data: ClientCreationAttributes, repOptions?: CreateOptions): Promise<Client> {
  return Client.create(data, repOptions);
}
