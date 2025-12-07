import { httpTransport } from '#Infrastructure/fastify';
import { list as listTrips } from '../repositories/list';
import { ListTripsSchema } from '../schemas/list';

httpTransport.handler.get('/api/trip/v1/list', ListTripsSchema, async (request) => {
  const trips = await listTrips(request.query as any);
  return { data: trips } as any;
});
