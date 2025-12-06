import ProductAttribute from '#App/productAttributes/models/productAttribute.model';

/**
 * Веса для расчета релевантности товара:
 * - Привязка к культуре региона: 0.5
 * - Материал товара: 0.2
 * - Тег товара (кому дарят): 0.2
 * - Тип товара (craftType): 0.1
 */
const WEIGHTS = {
  CULTURE: 0.5,
  MATERIAL: 0.2,
  TAG: 0.2,
  CRAFT_TYPE: 0.1,
};

export interface WeightFilters {
  tags?: string[];
  craftTypes?: string[];
  materials?: string[];
}

/**
 * Вычисляет вес товара на основе его атрибутов и пользовательских фильтров
 * @param attributes - атрибуты товара
 * @param filters - фильтры пользователя
 * @returns вес товара от 0 до 1
 */
export function calculateProductWeight(
  attributes: ProductAttribute[],
  filters: WeightFilters,
): number {
  const { tags = [], craftTypes = [], materials = [] } = filters;

  let weight = 0;

  // 1. Привязка к культуре региона (0.5)
  const cultureAttribute = attributes.find((attr) => attr.isCulture === true);
  if (cultureAttribute) {
    weight += WEIGHTS.CULTURE;
  }

  // 2. Материал товара (0.2)
  if (materials.length > 0) {
    const hasMatchingMaterial = attributes.some(
      (attr) => attr.type === 'material' && materials.includes(attr.value),
    );
    if (hasMatchingMaterial) {
      weight += WEIGHTS.MATERIAL;
    }
  }

  // 3. Тег товара - кому дарят (0.2)
  if (tags.length > 0) {
    const hasMatchingTag = attributes.some(
      (attr) => attr.type === 'tag' && tags.includes(attr.value),
    );
    if (hasMatchingTag) {
      weight += WEIGHTS.TAG;
    }
  }

  // 4. Тип товара - craftType (0.1)
  if (craftTypes.length > 0) {
    const hasMatchingCraftType = attributes.some(
      (attr) => attr.type === 'craftType' && craftTypes.includes(attr.value),
    );
    if (hasMatchingCraftType) {
      weight += WEIGHTS.CRAFT_TYPE;
    }
  }

  return weight;
}
