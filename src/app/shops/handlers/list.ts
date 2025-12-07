import { httpTransport } from '#Infrastructure/fastify';
import { ListShopsSchema } from '../schemas/list';
import { list as listShops } from '../repositories/list';
import { getFavoriteProductGuids } from '#App/favorites/repositories/getFavoriteProductGuids';
import { generateAttachmentUrl } from '#App/productAttachments/services/generateAttachmentUrl';

httpTransport.handler.get('/api/clients/v1/shop/list', ListShopsSchema, async (request) => {
  const { latitude, longitude, radius, ...filters } = request.query;
  const userGuid = request.context.user?.guid;

  // Если указаны координаты и радиус, добавляем их в фильтры
  const shopFilters = {
    ...filters,
    ...(latitude !== undefined && longitude !== undefined && radius !== undefined
      ? { coordinates: { latitude, longitude }, radius }
      : {}),
  };

  const shops = await listShops(shopFilters);

  // Получаем список GUID избранных товаров для текущего пользователя
  let favoriteProductGuids: string[] = [];
  if (userGuid) {
    favoriteProductGuids = await getFavoriteProductGuids({ userGuid });
  }

  // Добавляем флаг isFavorite и URL к вложениям для каждого продукта в магазинах
  const shopsWithFavorites = shops.map((shop: any) => ({
    ...shop,
    products: shop.products?.map((product: any) => ({
      ...product,
      isFavorite: favoriteProductGuids.includes(product.guid),
      attachments: (product.attachments || []).map((attachment: any) => ({
        ...attachment,
        url: generateAttachmentUrl(product.guid, attachment.attachmentGuid),
      })),
    })),
  }));

  return { data: shopsWithFavorites };
});
