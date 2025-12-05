import Client from '#App/clients/models/client.model';
import { FindOptions } from 'sequelize';

export async function get(
  filters: Partial<Pick<Client, 'id' | 'guid' | 'name' | 'apiKey'>>,
  repOptions?: FindOptions,
): Promise<Client | null> {
  return Client.findOne({ where: filters, ...repOptions });
}
