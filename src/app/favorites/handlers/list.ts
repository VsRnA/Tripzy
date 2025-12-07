import { httpTransport } from '#Infrastructure/fastify';
import { generateAttachmentUrl } from '#App/productAttachments/services/generateAttachmentUrl';
import { list as listFavorites } from '../repositories/list';
import { GetFavoritesListSchema } from '../schemas/list';

httpTransport.handler.get('/api/favorites/v1', GetFavoritesListSchema, async (request) => {
  const userGuid = request.context.user!.guid;

  const favorites = await listFavorites({ userGuid });

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
