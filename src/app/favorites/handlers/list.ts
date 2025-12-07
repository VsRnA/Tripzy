import { httpTransport } from '#Infrastructure/fastify';
import { GetFavoritesListSchema } from '../schemas/list';
import { list as listFavorites } from '../repositories/list';
import { generateAttachmentUrl } from '#App/productAttachments/services/generateAttachmentUrl';

httpTransport.handler.get('/api/favorites/v1', GetFavoritesListSchema, async (request) => {
  const userGuid = request.context.user!.guid;

  const favorites = await listFavorites({ userGuid });

  // Добавляем URL к вложениям для каждого товара
  const favoritesWithUrls = favorites.map((favorite: any) => ({
    ...favorite,
    product: {
      ...favorite.product,
      attachments: (favorite.product?.attachments || []).map((attachment: any) => ({
        ...attachment,
        url: generateAttachmentUrl(favorite.product.guid, attachment.attachmentGuid),
      })),
    },
  }));

  return {
    data: favoritesWithUrls,
  };
});
