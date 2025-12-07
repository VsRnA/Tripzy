import Favorite from '#App/favorites/models/favorite.model';
import Product from '#App/products/models/product.model';
import ProductAttachment from '#App/productAttachments/models/productAttachment.model';
import Shop from '#App/shops/models/shop.model';
import { plainify } from '#Lib/database/sequelize';
import { FindOptions } from 'sequelize';

export interface ListFilters {
  userGuid?: string;
}

/**
 * Получает список избранных товаров пользователя
 * @param filters - фильтры по пользователю
 * @param repOptions - дополнительные опции для запроса
 * @returns список избранных товаров с данными о продукте и магазине
 */
export async function list(filters: ListFilters = {}, repOptions?: FindOptions) {
  const whereConditions: any = {};

  if (filters.userGuid) {
    whereConditions.userGuid = filters.userGuid;
  }

  const favorites = await Favorite.findAll({
    where: whereConditions,
    include: [
      {
        model: Product,
        as: 'product',
        required: true,
        include: [
          {
            model: Shop,
            as: 'shop',
            required: true,
            attributes: ['guid', 'name', 'region', 'city'],
          },
          {
            model: ProductAttachment,
            as: 'attachments',
            required: false,
            attributes: ['attachmentGuid'],
          },
        ],
      },
    ],
    ...repOptions,
  });

  return plainify(favorites);
}
