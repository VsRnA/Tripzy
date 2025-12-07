import { ProductAttributeAttributes } from '#App/productAttributes/models/productAttribute.model';

/**
 * Веса для расчета релевантности товара:
 * - Привязка к культуре региона: +10 (бонус за региональную специфику)
 * - Совпадение тега (кому дарят): +5 за каждое совпадение, -3 за каждое несовпадение
 * - Совпадение типа ремесла: +3 за каждое совпадение, -2 за каждое несовпадение
 * - Совпадение материала: +2 за каждое совпадение, -1 за каждое несовпадение
 */
const WEIGHTS = {
  CULTURE_BONUS: 10,
  TAG_MATCH: 5,
  TAG_MISMATCH: -3,
  CRAFT_TYPE_MATCH: 3,
  CRAFT_TYPE_MISMATCH: -2,
  MATERIAL_MATCH: 2,
  MATERIAL_MISMATCH: -1,
};

export interface WeightFilters {
  tags?: string[];
  craftTypes?: string[];
  materials?: string[];
}

/**
 * Вычисляет вес товара на основе его атрибутов и пользовательских фильтров.
 * Использует систему прибавления/вычитания баллов:
 * - Прибавляем баллы за совпадения с запросом пользователя
 * - Вычитаем баллы за несовпадения (товар имеет атрибут, но он не подходит)
 * - Даем бонус за привязку к культуре региона
 *
 * @param attributes - атрибуты товара
 * @param filters - фильтры пользователя
 * @returns вес товара (может быть отрицательным при большом количестве несовпадений)
 */
export function calculateProductWeight(
  attributes: ProductAttributeAttributes[],
  filters: WeightFilters,
): number {
  const { tags = [], craftTypes = [], materials = [] } = filters;

  let weight = 0;

  // 1. Бонус за привязку к культуре региона (+10)
  const cultureAttribute = attributes.find((attr) => attr.isCulture === true);
  if (cultureAttribute) {
    weight += WEIGHTS.CULTURE_BONUS;
  }

  // 2. Теги товара - кому дарят
  if (tags.length > 0) {
    const productTags = attributes.filter((attr) => attr.type === 'tag');

    productTags.forEach((productTag) => {
      if (tags.includes(productTag.value)) {
        // Совпадение: +5
        weight += WEIGHTS.TAG_MATCH;
      } else {
        // Несовпадение: -3
        weight += WEIGHTS.TAG_MISMATCH;
      }
    });
  }

  // 3. Типы ремесла
  if (craftTypes.length > 0) {
    const productCraftTypes = attributes.filter((attr) => attr.type === 'craftType');

    productCraftTypes.forEach((productCraftType) => {
      if (craftTypes.includes(productCraftType.value)) {
        // Совпадение: +3
        weight += WEIGHTS.CRAFT_TYPE_MATCH;
      } else {
        // Несовпадение: -2
        weight += WEIGHTS.CRAFT_TYPE_MISMATCH;
      }
    });
  }

  // 4. Материалы
  if (materials.length > 0) {
    const productMaterials = attributes.filter((attr) => attr.type === 'material');

    productMaterials.forEach((productMaterial) => {
      if (materials.includes(productMaterial.value)) {
        // Совпадение: +2
        weight += WEIGHTS.MATERIAL_MATCH;
      } else {
        // Несовпадение: -1
        weight += WEIGHTS.MATERIAL_MISMATCH;
      }
    });
  }

  return weight;
}
