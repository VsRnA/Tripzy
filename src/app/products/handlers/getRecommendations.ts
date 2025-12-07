import { httpTransport } from '#Infrastructure/fastify';
import { GetRecommendationsSchema } from '../schemas/getRecommendations';
import { list } from '../repositories/list';
import { calculateProductWeight } from '../services/calculateProductWeight';
import { find as findWaypoint } from '#App/tripWaypoints/repositories/find';
import { getFavoriteProductGuids } from '#App/favorites/repositories/getFavoriteProductGuids';
import { generateAttachmentUrl } from '#App/productAttachments/services/generateAttachmentUrl';

httpTransport.handler.get(
  '/api/products/v1/recommendations',
  GetRecommendationsSchema,
  async (request) => {
    const { tags, craftTypes, materials, region, city, waypointGuid, radius } = request.query;
    const userGuid = request.context.user?.guid;

    let waypointCoordinates = undefined;
    if (waypointGuid) {
      const waypoint = await findWaypoint({ guid: waypointGuid });
      waypointCoordinates = {
        latitude: waypoint.latitude,
        longitude: waypoint.longitude,
      };
    }

    const products = await list({
      region,
      city,
      removalMark: false,
      inStock: true,
      waypointCoordinates,
      radius,
    });

    // Получаем список GUID избранных товаров для текущего пользователя
    let favoriteProductGuids: string[] = [];
    if (userGuid) {
      favoriteProductGuids = await getFavoriteProductGuids({ userGuid });
    }

    const productsWithWeight = products.map((product) => {
      const productData = product.toJSON() as any;
      const attributes = productData.attributes || [];

      const weight = calculateProductWeight(attributes, {
        tags,
        craftTypes,
        materials,
      });

      // Добавляем URL к вложениям
      const attachmentsWithUrls = (productData.attachments || []).map((attachment: any) => ({
        ...attachment,
        url: generateAttachmentUrl(productData.guid, attachment.attachmentGuid),
      }));

      return {
        product: {
          ...productData,
          isFavorite: favoriteProductGuids.includes(productData.guid),
          attachments: attachmentsWithUrls,
        },
        weight,
      };
    });

    productsWithWeight.sort((a, b) => b.weight - a.weight);

    const sortedProducts = productsWithWeight.map((item) => item.product);

    return {
      data: sortedProducts,
    };
  },
);
