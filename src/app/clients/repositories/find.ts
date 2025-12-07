import { FindOptions } from 'sequelize';
import { NotFoundError } from '#Lib/errors';
import Client from '#App/clients/models/client.model';

export async function find(
  filters: Partial<Pick<Client, 'id' | 'guid' | 'name' | 'apiKey'>>,
  repOptions?: FindOptions,
): Promise<Client> {
  const client = await Client.findOne({ where: filters, ...repOptions });

  if (!client) {
    throw new NotFoundError('Client', filters);
  }

  return client;
}
