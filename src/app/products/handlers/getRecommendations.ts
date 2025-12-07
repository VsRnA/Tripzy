import { httpTransport } from '#Infrastructure/fastify';
import { getFavoriteProductGuids } from '#App/favorites/repositories/getFavoriteProductGuids';
import { ProductAttachmentAttributes } from '#App/productAttachments/models/productAttachment.model';
import { generateAttachmentUrl } from '#App/productAttachments/services/generateAttachmentUrl';
import { ProductAttributeAttributes } from '#App/productAttributes/models/productAttribute.model';
import { find as findWaypoint } from '#App/tripWaypoints/repositories/find';
import { list } from '../repositories/list';
import { GetRecommendationsSchema } from '../schemas/getRecommendations';
import { calculateProductWeight } from '../services/calculateProductWeight';

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
      const attributes = (product.attributes ?? []) as ProductAttributeAttributes[];
      const attachments = (product.attachments ?? []) as ProductAttachmentAttributes[];

      const weight = calculateProductWeight(attributes, {
        tags,
        craftTypes,
        materials,
      });

      // Добавляем URL к вложениям
      const attachmentsWithUrls = attachments.map((attachment) => ({
        productGuid: attachment.productGuid,
        attachmentGuid: attachment.attachmentGuid,
        createdAt: attachment.createdAt,
        updatedAt: attachment.updatedAt,
        url: generateAttachmentUrl(product.guid, attachment.attachmentGuid),
      }));

      return {
        product: {
          guid: product.guid,
          shopGuid: product.shopGuid,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          removalMark: product.removalMark,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          isFavorite: favoriteProductGuids.includes(product.guid),
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
