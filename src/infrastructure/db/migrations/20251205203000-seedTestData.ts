import { QueryInterface } from 'sequelize';
import crypto, { randomUUID } from 'crypto';

const tableName = {
  clients: 'clients',
  shops: 'shops',
  users: 'users',
  shopAdministrators: 'shopAdministrators',
  products: 'products',
  productTags: 'productTags',
};

// Города России с регионами
const russianCities = [
  { city: 'Москва', region: 'Москва' },
  { city: 'Санкт-Петербург', region: 'Ленинградская область' },
  { city: 'Казань', region: 'Республика Татарстан' },
  { city: 'Екатеринбург', region: 'Свердловская область' },
  { city: 'Новосибирск', region: 'Новосибирская область' },
  { city: 'Нижний Новгород', region: 'Нижегородская область' },
  { city: 'Краснодар', region: 'Краснодарский край' },
  { city: 'Владивосток', region: 'Приморский край' },
];

// Названия для магазинов сувениров
const shopNames = [
  'Сувениры России',
  'Русские традиции',
  'Подарки от сердца',
  'Мастерская сувениров',
  'Народные промыслы',
  'Сувенирная лавка',
];

// Названия сувениров
const souvenirNames = [
  'Матрёшка классическая',
  'Матрёшка расписная',
  'Шкатулка палех',
  'Самовар декоративный',
  'Платок павлопосадский',
  'Магнит с видами города',
  'Кружка с гербом',
  'Ложка хохлома',
  'Тарелка декоративная',
  'Колокольчик сувенирный',
  'Брелок с символикой',
  'Шапка-ушанка сувенирная',
  'Балалайка декоративная',
  'Фигурка медведя',
  'Значок с гербом',
];

// Теги для продуктов
const productTags = [
  'children',
  'relatives',
  'colleagues',
  'friends',
  'partner',
  'parents',
  'myself',
  'other',
];

// Генератор случайного числа в диапазоне
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генератор случайного элемента из массива
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Генератор случайной цены
function randomPrice(): number {
  return randomInt(100, 5000);
}

// Генератор случайного количества
function randomQuantity(): number {
  return randomInt(5, 100);
}

// Генератор API ключа
function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Генератор хеша пароля (для примера используем простой хеш)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Миграция для заполнения базы данных тестовыми данными
 */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const now = new Date();
    const clients: any[] = [];
    const shops: any[] = [];
    const users: any[] = [];
    const shopAdministrators: any[] = [];
    const products: any[] = [];
    const productTagsData: any[] = [];

    // Создаем клиентов (по одному на каждый город)
    for (let i = 0; i < russianCities.length; i++) {
      const cityData = russianCities[i];
      const clientGuid = randomUUID();

      clients.push({
        guid: clientGuid,
        name: `Клиент ${cityData.city}`,
        apiKey: generateApiKey(),
        removalMark: false,
        createdAt: now,
        updatedAt: now,
      });

      // Создаем 2-3 магазина для каждого клиента
      const shopsCount = randomInt(2, 3);
      for (let j = 0; j < shopsCount; j++) {
        const shopGuid = randomUUID();

        shops.push({
          guid: shopGuid,
          clientGuid: clientGuid,
          name: `${randomElement(shopNames)} (${cityData.city})`,
          address: `ул. ${['Ленина', 'Пушкина', 'Гагарина', 'Мира', 'Советская'][randomInt(0, 4)]}, д. ${randomInt(1, 100)}`,
          city: cityData.city,
          region: cityData.region,
          schedule: JSON.stringify({
            monday: '10:00-20:00',
            tuesday: '10:00-20:00',
            wednesday: '10:00-20:00',
            thursday: '10:00-20:00',
            friday: '10:00-20:00',
            saturday: '10:00-18:00',
            sunday: '10:00-18:00',
          }),
          removalMark: false,
          createdAt: now,
          updatedAt: now,
        });

        // Создаем одного администратора для каждого магазина
        const adminGuid = randomUUID();
        users.push({
          guid: adminGuid,
          email: `admin.${shopGuid.slice(0, 8)}@example.com`,
          password: hashPassword('password123'),
          firstName: ['Иван', 'Петр', 'Сергей', 'Александр', 'Дмитрий'][randomInt(0, 4)],
          lastName: ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов'][randomInt(0, 4)],
          patronymicName: ['Иванович', 'Петрович', 'Сергеевич', 'Александрович', 'Дмитриевич'][randomInt(0, 4)],
          phone: `+7${randomInt(900, 999)}${randomInt(1000000, 9999999)}`,
          country: 'Россия',
          age: randomInt(25, 55),
          clientId: null,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        });

        shopAdministrators.push({
          shopGuid: shopGuid,
          userGuid: adminGuid,
          createdAt: now,
          updatedAt: now,
        });

        // Создаем 10-15 продуктов для каждого магазина
        const productsCount = randomInt(10, 15);
        for (let k = 0; k < productsCount; k++) {
          const productGuid = randomUUID();

          products.push({
            guid: productGuid,
            shopGuid: shopGuid,
            name: `${randomElement(souvenirNames)} (${cityData.city})`,
            price: randomPrice(),
            quantity: randomQuantity(),
            removalMark: false,
            createdAt: now,
            updatedAt: now,
          });

          // Создаем 3-4 тега для каждого продукта
          const tagsCount = randomInt(3, 4);
          const selectedTags = new Set<string>();

          while (selectedTags.size < tagsCount) {
            selectedTags.add(randomElement(productTags));
          }

          for (const tag of selectedTags) {
            productTagsData.push({
              productGuid: productGuid,
              tag: tag,
              createdAt: now,
              updatedAt: now,
            });
          }
        }
      }
    }

    // Вставляем данные в БД
    await queryInterface.bulkInsert(tableName.clients, clients, {});
    await queryInterface.bulkInsert(tableName.shops, shops, {});
    await queryInterface.bulkInsert(tableName.users, users, {});
    await queryInterface.bulkInsert(tableName.shopAdministrators, shopAdministrators, {});
    await queryInterface.bulkInsert(tableName.products, products, {});
    await queryInterface.bulkInsert(tableName.productTags, productTagsData, {});
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // Удаляем данные в обратном порядке из-за внешних ключей
    await queryInterface.bulkDelete(tableName.productTags, {}, {});
    await queryInterface.bulkDelete(tableName.products, {}, {});
    await queryInterface.bulkDelete(tableName.shopAdministrators, {}, {});
    await queryInterface.bulkDelete(tableName.users, {}, {});
    await queryInterface.bulkDelete(tableName.shops, {}, {});
    await queryInterface.bulkDelete(tableName.clients, {}, {});
  },
};
