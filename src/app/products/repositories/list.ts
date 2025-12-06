import Product from '#App/products/models/product.model';
import ProductAttribute from '#App/productAttributes/models/productAttribute.model';
import Shop from '#App/shops/models/shop.model';
import { Op, FindOptions } from 'sequelize';

export interface ListFilters {
  region?: string;
  city?: string;
  shopGuids?: string[];
  removalMark?: boolean;
  inStock?: boolean;
}

/**
 * Получает список товаров с фильтрацией
 * @param filters - фильтры по региону, городу, магазинам, наличию и пометке удаления
 * @param repOptions - дополнительные опции для запроса
 * @returns список товаров с их атрибутами и данными магазина
 */
export async function list(filters: ListFilters = {}, repOptions?: FindOptions): Promise<Product[]> {
  const { region, city, shopGuids, removalMark = false, inStock = false } = filters;

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
  if (shopGuids && shopGuids.length > 0) {
    shopWhere.guid = { [Op.in]: shopGuids };
  }

  // Получаем товары с атрибутами и данными магазина
  const products = await Product.findAll({
    where: whereConditions,
    include: [
      {
        model: Shop,
        as: 'shop',
        required: true,
        attributes: ['guid', 'name', 'region', 'city'],
        where: Object.keys(shopWhere).length > 0 ? shopWhere : undefined,
      },
      {
        model: ProductAttribute,
        as: 'attributes',
        required: false,
      },
    ],
    subQuery: false,
    ...repOptions,
  });

  return products;
}
