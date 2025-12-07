import { FindOptions } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import Favorite from '#App/favorites/models/favorite.model';
import ProductAttachment from '#App/productAttachments/models/productAttachment.model';
import Product from '#App/products/models/product.model';
import Shop from '#App/shops/models/shop.model';

export interface ListFilters {
  userGuid?: string;
}

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
