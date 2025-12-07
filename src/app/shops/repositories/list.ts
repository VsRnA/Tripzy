import { WhereOptions, FindOptions, Op } from 'sequelize';
import { plainify } from '#Lib/database/sequelize';
import { calculateDistance, Coordinates } from '#Shared/geo/calculateDistance';
import Client from '#App/clients/models/client.model';
import ProductAttachment from '#App/productAttachments/models/productAttachment.model';
import Product from '#App/products/models/product.model';
import Shop from '#App/shops/models/shop.model';

export interface ListShopFilters {
  guid?: string;
  clientGuid?: string;
  name?: string;
  city?: string;
  region?: string;
  removalMark?: boolean;
  coordinates?: Coordinates;
  radius?: number;
  limit?: number;
  offset?: number;
}

/**
 * Получает список магазинов с фильтрацией и пагинацией
 */
export async function list(filters: ListShopFilters = {}, repOptions?: FindOptions) {
  const where: WhereOptions<Shop> = {};

  if (filters.guid) {
    where.guid = filters.guid;
  }

  if (filters.clientGuid) {
    where.clientGuid = filters.clientGuid;
  }

  if (filters.name) {
    where.name = { [Op.iLike]: `%${filters.name}%` };
  }

  if (filters.city) {
    where.city = filters.city;
  }

  if (filters.region) {
    where.region = filters.region;
  }

  if (filters.removalMark !== undefined) {
    where.removalMark = filters.removalMark;
  }

  const shops = await Shop.findAll({
    where,
    include: [
      {
        model: Client,
        as: 'client',
        attributes: ['guid', 'name'],
      },
      {
        model: Product,
        as: 'products',
        required: false,
        include: [
          {
            model: ProductAttachment,
            as: 'attachments',
            required: false,
          },
        ],
      },
    ],
    limit: filters.limit || 20,
    offset: filters.offset || 0,
    order: [['createdAt', 'DESC']],
    ...repOptions,
  });

  const plainShops = await plainify(shops);

  // Фильтруем по радиусу, если указаны координаты
  if (filters.coordinates && filters.radius !== undefined) {
    return plainShops.filter((shop: any) => {
      if (shop.latitude === null || shop.longitude === null) {
        return false;
      }

      const shopCoordinates: Coordinates = {
        latitude: Number(shop.latitude),
        longitude: Number(shop.longitude),
      };

      const distance = calculateDistance(filters.coordinates!, shopCoordinates);
      return distance <= filters.radius!;
    });
  }

  return plainShops;
}
