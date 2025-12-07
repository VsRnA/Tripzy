import { FindOptions } from 'sequelize';
import Client from '#App/clients/models/client.model';

export async function get(
  filters: Partial<Pick<Client, 'id' | 'guid' | 'name' | 'apiKey'>>,
  repOptions?: FindOptions,
): Promise<Client | null> {
  return Client.findOne({ where: filters, ...repOptions });
}
