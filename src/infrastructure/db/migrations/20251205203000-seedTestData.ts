import { QueryInterface } from 'sequelize';
import crypto, { randomUUID } from 'crypto';
import { ROLES } from '#Shared/roles';

const tableName = {
  clients: 'clients',
  shops: 'shops',
  users: 'users',
  shopAdministrators: 'shopAdministrators',
  products: 'products',
  productTags: 'productTags',
  userRoles: 'userRoles',
  userRoleAssignments: 'userRoleAssignments',
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
    const userRoles: any[] = [];
    const userRoleAssignments: any[] = [];

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

      // Создаем роли для каждого клиента
      userRoles.push(
        {
          name: ROLES.CLIENT_ADMIN.name,
          keyWord: ROLES.CLIENT_ADMIN.keyWord,
          clientGuid: clientGuid,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: ROLES.SHOP_ADMIN.name,
          keyWord: ROLES.SHOP_ADMIN.keyWord,
          clientGuid: clientGuid,
          createdAt: now,
          updatedAt: now,
        }
      );

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
          clientGuid: clientGuid,
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

      // Создаем одного администратора клиента для каждого клиента
      const clientAdminGuid = randomUUID();
      users.push({
        guid: clientAdminGuid,
        email: `client_admin.${clientGuid.slice(0, 8)}@example.com`,
        password: hashPassword('password123'),
        firstName: ['Иван', 'Петр', 'Сергей', 'Александр', 'Дмитрий'][randomInt(0, 4)],
        lastName: ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов'][randomInt(0, 4)],
        patronymicName: ['Иванович', 'Петрович', 'Сергеевич', 'Александрович', 'Дмитриевич'][randomInt(0, 4)],
        phone: `+7${randomInt(900, 999)}${randomInt(1000000, 9999999)}`,
        country: 'Россия',
        age: randomInt(30, 60),
        clientGuid: clientGuid,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    }

    // Создаем несколько туристов (пользователи без привязки к клиенту)
    for (let i = 0; i < 5; i++) {
      users.push({
        guid: randomUUID(),
        email: `tourist${i + 1}@example.com`,
        password: hashPassword('password123'),
        firstName: ['Анна', 'Мария', 'Елена', 'Ольга', 'Татьяна'][i],
        lastName: ['Иванова', 'Петрова', 'Сидорова', 'Смирнова', 'Кузнецова'][i],
        patronymicName: ['Ивановна', 'Петровна', 'Сергеевна', 'Александровна', 'Дмитриевна'][i],
        phone: `+7${randomInt(900, 999)}${randomInt(1000000, 9999999)}`,
        country: 'Россия',
        age: randomInt(20, 50),
        clientGuid: null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });
    }

    // Вставляем данные в БД (сначала вставляем роли и пользователей, чтобы потом создать связи)
    await queryInterface.bulkInsert(tableName.clients, clients, {});
    await queryInterface.bulkInsert(tableName.userRoles, userRoles, {});
    await queryInterface.bulkInsert(tableName.shops, shops, {});
    await queryInterface.bulkInsert(tableName.users, users, {});
    await queryInterface.bulkInsert(tableName.shopAdministrators, shopAdministrators, {});
    await queryInterface.bulkInsert(tableName.products, products, {});
    await queryInterface.bulkInsert(tableName.productTags, productTagsData, {});

    // Получаем созданные роли для создания связей userRoleAssignments
    const [rolesFromDb] = await queryInterface.sequelize.query(
      'SELECT id, "keyWord", "clientGuid" FROM "userRoles"'
    );

    // Получаем всех пользователей
    const [usersFromDb] = await queryInterface.sequelize.query(
      'SELECT guid, "clientGuid" FROM users'
    );

    // Создаем связи между пользователями и ролями
    for (const user of usersFromDb as any[]) {
      if (user.clientGuid) {
        // Пользователь привязан к клиенту
        // Проверяем, является ли пользователь администратором магазина
        const [shopAdmins] = await queryInterface.sequelize.query(
          `SELECT "userGuid" FROM "shopAdministrators" WHERE "userGuid" = '${user.guid}'`
        );

        if ((shopAdmins as any[]).length > 0) {
          // Это администратор магазина
          const shopAdminRole = (rolesFromDb as any[]).find(
            (r) => r.keyWord === ROLES.SHOP_ADMIN.keyWord && r.clientGuid === user.clientGuid
          );
          if (shopAdminRole) {
            userRoleAssignments.push({
              userGuid: user.guid,
              roleId: shopAdminRole.id,
              createdAt: now,
              updatedAt: now,
            });
          }
        } else {
          // Это администратор клиента
          const clientAdminRole = (rolesFromDb as any[]).find(
            (r) => r.keyWord === ROLES.CLIENT_ADMIN.keyWord && r.clientGuid === user.clientGuid
          );
          if (clientAdminRole) {
            userRoleAssignments.push({
              userGuid: user.guid,
              roleId: clientAdminRole.id,
              createdAt: now,
              updatedAt: now,
            });
          }
        }
      } else {
        // Это турист (пользователь без клиента)
        const touristRole = (rolesFromDb as any[]).find(
          (r) => r.keyWord === ROLES.TOURIST.keyWord && r.clientGuid === null
        );
        if (touristRole) {
          userRoleAssignments.push({
            userGuid: user.guid,
            roleId: touristRole.id,
            createdAt: now,
            updatedAt: now,
          });
        }
      }
    }

    // Вставляем связи пользователей и ролей
    await queryInterface.bulkInsert(tableName.userRoleAssignments, userRoleAssignments, {});
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // Удаляем данные в обратном порядке из-за внешних ключей
    await queryInterface.bulkDelete(tableName.productTags, {}, {});
    await queryInterface.bulkDelete(tableName.products, {}, {});
    await queryInterface.bulkDelete(tableName.shopAdministrators, {}, {});
    await queryInterface.bulkDelete(tableName.userRoleAssignments, {}, {});
    await queryInterface.bulkDelete(tableName.users, {}, {});
    await queryInterface.bulkDelete(tableName.shops, {}, {});
    await queryInterface.bulkDelete(tableName.userRoles, {}, {});
    await queryInterface.bulkDelete(tableName.clients, {}, {});
  },
};
