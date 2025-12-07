import Product from '#App/products/models/product.model';
import ProductAttribute from '#App/productAttributes/models/productAttribute.model';
import ProductAttachment from '#App/productAttachments/models/productAttachment.model';
import Shop from '#App/shops/models/shop.model';
import { Op, FindOptions } from 'sequelize';
import { calculateDistance, Coordinates } from '#Shared/geo/calculateDistance';

export interface ListFilters {
  region?: string;
  city?: string;
  removalMark?: boolean;
  inStock?: boolean;
  waypointCoordinates?: Coordinates;
  radius?: number;
}

/**
 * Получает список товаров с фильтрацией
 * @param filters - фильтры по региону, городу, координатам, наличию и пометке удаления
 * @param repOptions - дополнительные опции для запроса
 * @returns список товаров с их атрибутами и данными магазина
 */
export async function list(filters: ListFilters = {}, repOptions?: FindOptions): Promise<Product[]> {
  const { region, city, removalMark = false, inStock = false, waypointCoordinates, radius } = filters;

  // Базовые условия
  const whereConditions: any = {
    removalMark,
  };

  // Только товары в наличии
  if (inStock) {
    whereConditions.quantity = { [Op.gt]: 0 };
  }

  // Условия для магазина
  const shopWhere: any = {};
  if (region) {
    shopWhere.region = region;
  }
  if (city) {
    shopWhere.city = city;
  }

  // Получаем товары с атрибутами, вложениями и данными магазина
  const products = await Product.findAll({
    where: whereConditions,
    include: [
      {
        model: Shop,
        as: 'shop',
        required: true,
        attributes: ['guid', 'name', 'region', 'city', 'latitude', 'longitude'],
        where: Object.keys(shopWhere).length > 0 ? shopWhere : undefined,
      },
      {
        model: ProductAttribute,
        as: 'attributes',
        required: false,
      },
      {
        model: ProductAttachment,
        as: 'attachments',
        required: false,
      },
    ],
    subQuery: false,
    ...repOptions,
  });

  // Фильтруем по радиусу, если указаны координаты
  if (waypointCoordinates && radius !== undefined) {
    return products.filter((product) => {
      const shop = product.get('shop') as any;
      if (!shop || shop.latitude === null || shop.longitude === null) {
        return false;
      }

      const shopCoordinates: Coordinates = {
        latitude: Number(shop.latitude),
        longitude: Number(shop.longitude),
      };

      const distance = calculateDistance(waypointCoordinates, shopCoordinates);
      return distance <= radius;
    });
  }

  return products;
}
