import { httpTransport } from '#Infrastructure/fastify';
import { CreateTripSchema } from '../schemas/create';
import { create as createTrip } from '../repositories/create';
import { find as findTrip } from '../repositories/find';
import { create as createTripWaypoint } from '#App/tripWaypoints/repositories/create';
import { create as createUserTripsAssignment } from '#App/userTripsAssignment/repositories/create';
import { WaypointType } from '#App/tripWaypoints/models/tripWaypoint.model';
import db from '#Infrastructure/sequelize';

httpTransport.handler.post('/api/trips/v1/create', CreateTripSchema, async (request) => {
  const { name, goal, budgetMin, budgetMax, cities } = request.payload;
  const userGuid = request.context.user!.guid;

  const trip = await db.runInTransaction(async (transaction) => {
    const repOptions = { transaction };

    const newTrip = await createTrip({
      name,
      goal: goal as any,
      budgetMin,
      budgetMax,
    }, repOptions);

    await createUserTripsAssignment({
      userGuid,
      tripGuid: newTrip.guid,
    }, repOptions);

    for (let cityIndex = 0; cityIndex < cities.length; cityIndex++) {
      const city = cities[cityIndex];

      const cityWaypoint = await createTripWaypoint({
        tripGuid: newTrip.guid,
        parentGuid: null,
        type: WaypointType.city,
        address: city.address,
        orderIndex: cityIndex,
        visitDate: city.visitDate ?? null,
        description: city.description ?? null,
      }, repOptions);

      if (city.attractions && city.attractions.length > 0) {
        for (let attractionIndex = 0; attractionIndex < city.attractions.length; attractionIndex++) {
          const attraction = city.attractions[attractionIndex];

          await createTripWaypoint({
            tripGuid: newTrip.guid,
            parentGuid: cityWaypoint.guid,
            type: WaypointType.attraction,
            address: attraction.address,
            orderIndex: attractionIndex,
            visitDate: attraction.visitDate ?? null,
            description: attraction.description ?? null,
          }, repOptions);
        }
      }
    }

    const tripWithWaypoints = await findTrip({ guid: newTrip.guid }, repOptions);

    return tripWithWaypoints;
  });

  return { data: { trip } } as any;
});
