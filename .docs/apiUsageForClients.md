# API для клиентов (Client API)

Это руководство описывает использование API для клиентов платформы Tripzy. API позволяет клиентам управлять своими данными, включая магазины, продукты, администраторов и пользователей.

## Аутентификация

Для использования Client API требуется:

1. **API ключ клиента** - передается в заголовке `X-API-Key`
2. **JWT токен пользователя** (для некоторых эндпоинтов) - передается в заголовке `Authorization` в формате `JWT <token>`

### Получение API ключа

API ключ выдается при регистрации клиента:

```http
POST /api/clients/v1/register
Content-Type: application/json

{
  "name": "Название организации"
}
```

Ответ:
```json
{
  "data": {
    "client": {
      "id": 1,
      "guid": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Название организации",
      "apiKey": "ck_1234567890abcdef...",
      "removalMark": false,
      "createdAt": "2025-12-07T00:00:00.000Z",
      "updatedAt": "2025-12-07T00:00:00.000Z"
    }
  }
}
```

**ВАЖНО:** Сохраните `apiKey` в безопасном месте, он понадобится для всех последующих запросов.

---

## Управление пользователями

### Создание пользователя организации

Позволяет создавать пользователей с ролями администратора организации (`clientAdmin`) или администратора магазина (`shopAdmin`).

```http
POST /api/clients/v1/users
X-API-Key: ck_1234567890abcdef...
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securePassword123",
  "firstName": "Иван",
  "lastName": "Иванов",
  "patronymicName": "Иванович",
  "phone": "+7 (999) 123-45-67",
  "country": "Россия",
  "age": 35,
  "roleKeyWord": "clientAdmin"
}
```

**Параметры:**
- `email` (обязательный) - Email пользователя
- `password` (обязательный) - Пароль (минимум 6 символов)
- `firstName` (обязательный) - Имя пользователя
- `lastName` (опциональный) - Фамилия
- `patronymicName` (опциональный) - Отчество
- `phone` (опциональный) - Телефон
- `country` (опциональный) - Страна
- `age` (опциональный) - Возраст
- `roleKeyWord` (обязательный) - Роль: `clientAdmin` или `shopAdmin`

**Роли:**
- `clientAdmin` - Администратор организации (может управлять всеми данными клиента)
- `shopAdmin` - Администратор магазина (может управлять своим магазином)

Ответ:
```json
{
  "data": {
    "user": {
      "guid": "456e7890-e89b-12d3-a456-426614174001",
      "email": "admin@example.com",
      "firstName": "Иван",
      "roles": [
        {
          "id": 2,
          "keyWord": "clientAdmin",
          "name": "Администратор организации"
        }
      ],
      "createdAt": "2025-12-07T00:00:00.000Z",
      "updatedAt": "2025-12-07T00:00:00.000Z"
    }
  }
}
```

---

## Управление магазинами

### Массовая загрузка магазинов

Создает несколько магазинов для клиента за один запрос.

**Требования:**
- API ключ клиента в заголовке `X-API-Key`
- JWT токен пользователя в заголовке `Authorization`
- Роль пользователя: `clientAdmin`

```http
POST /api/clients/v1/shops
X-API-Key: ck_1234567890abcdef...
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "shops": [
    {
      "name": "Магазин на Тверской",
      "address": "ул. Тверская, д. 1",
      "city": "Москва",
      "region": "Московская область",
      "latitude": 55.751244,
      "longitude": 37.618423,
      "schedule": {
        "monday": "09:00-21:00",
        "tuesday": "09:00-21:00",
        "wednesday": "09:00-21:00",
        "thursday": "09:00-21:00",
        "friday": "09:00-21:00",
        "saturday": "10:00-20:00",
        "sunday": "10:00-20:00"
      }
    }
  ]
}
```

**Параметры магазина:**
- `name` (обязательный) - Название магазина
- `address` (обязательный) - Адрес
- `city` (обязательный) - Город
- `region` (обязательный) - Регион
- `latitude` (обязательный) - Широта (от -90 до 90)
- `longitude` (обязательный) - Долгота (от -180 до 180)
- `schedule` (опциональный) - Расписание работы (объект с днями недели)

---

## Управление администраторами магазинов

### Массовая загрузка администраторов магазинов

Создает связи между пользователями и магазинами.

**Требования:**
- API ключ клиента в заголовке `X-API-Key`
- JWT токен пользователя в заголовке `Authorization`
- Роль пользователя: `clientAdmin`

```http
POST /api/clients/v1/shopAdministrators
X-API-Key: ck_1234567890abcdef...
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "shopAdministrators": [
    {
      "userGuid": "456e7890-e89b-12d3-a456-426614174001",
      "shopGuid": "789e0123-e89b-12d3-a456-426614174002"
    }
  ]
}
```

---

## Управление продуктами

### Массовая загрузка продуктов

Создает несколько продуктов для магазина за один запрос.

**Требования:**
- API ключ клиента в заголовке `X-API-Key`
- JWT токен пользователя в заголовке `Authorization`
- Роль пользователя: `clientAdmin` или `shopAdmin`

```http
POST /api/clients/v1/products
X-API-Key: ck_1234567890abcdef...
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "products": [
    {
      "shopGuid": "789e0123-e89b-12d3-a456-426614174002",
      "name": "Кофе латте",
      "description": "Классический латте с молочной пенкой",
      "price": 250.00,
      "discount": 10,
      "categories": ["Кофе", "Горячие напитки"]
    }
  ]
}
```

**Параметры продукта:**
- `shopGuid` (обязательный) - GUID магазина
- `name` (обязательный) - Название продукта
- `description` (опциональный) - Описание
- `price` (обязательный) - Цена (больше 0)
- `discount` (опциональный) - Скидка в процентах (от 0 до 100)
- `categories` (опциональный) - Массив категорий

### Массовая загрузка атрибутов продуктов

Создает атрибуты для продуктов (размеры, вкусы и т.д.).

```http
POST /api/clients/v1/productAttributes
X-API-Key: ck_1234567890abcdef...
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productAttributes": [
    {
      "productGuid": "abc12345-e89b-12d3-a456-426614174003",
      "name": "Размер",
      "value": "Большой"
    }
  ]
}
```

### Загрузка изображений продукта

Загружает изображения для конкретного продукта.

```http
POST /api/clients/v1/products/:productGuid/images
X-API-Key: ck_1234567890abcdef...
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

[binary image data]
```

---

## Коды ошибок

| Код | Описание |
|-----|----------|
| 200 | Успешный запрос |
| 201 | Ресурс успешно создан |
| 400 | Неверный запрос (ошибка валидации) |
| 401 | Не авторизован (неверный API ключ или JWT токен) |
| 403 | Доступ запрещен (недостаточно прав) |
| 404 | Ресурс не найден |
| 409 | Конфликт (ресурс уже существует) |
| 500 | Внутренняя ошибка сервера |

---

## Примеры использования

### Полный цикл создания организации

1. **Регистрация клиента:**
```bash
curl -X POST http://localhost:3000/api/clients/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Моя сеть кофеен"}'
```

2. **Создание администратора организации:**
```bash
curl -X POST http://localhost:3000/api/clients/v1/users \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ck_1234567890abcdef..." \
  -d '{
    "email": "admin@mycoffee.com",
    "password": "securePass123",
    "firstName": "Анна",
    "lastName": "Петрова",
    "roleKeyWord": "clientAdmin"
  }'
```

3. **Авторизация пользователя (получение JWT токена):**
```bash
curl -X POST http://localhost:3000/api/auth/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mycoffee.com",
    "password": "securePass123"
  }'
```

4. **Создание магазинов:**
```bash
curl -X POST http://localhost:3000/api/clients/v1/shops \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ck_1234567890abcdef..." \
  -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "shops": [
      {
        "name": "Кофейня Центр",
        "address": "ул. Центральная, 1",
        "city": "Москва",
        "region": "Московская область",
        "latitude": 55.751244,
        "longitude": 37.618423
      }
    ]
  }'
```

5. **Создание продуктов:**
```bash
curl -X POST http://localhost:3000/api/clients/v1/products \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ck_1234567890abcdef..." \
  -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "products": [
      {
        "shopGuid": "789e0123-e89b-12d3-a456-426614174002",
        "name": "Капучино",
        "description": "Классический капучино",
        "price": 200.00,
        "categories": ["Кофе"]
      }
    ]
  }'
```

---

## Лучшие практики

1. **Безопасность:**
   - Храните API ключ в безопасном месте (переменные окружения, секреты)
   - Никогда не передавайте API ключ в URL
   - Используйте HTTPS для всех запросов в production

2. **Производительность:**
   - Используйте массовые операции для создания нескольких записей
   - Кэшируйте JWT токены (они действительны 24 часа)

3. **Обработка ошибок:**
   - Всегда проверяйте статус-код ответа
   - Обрабатывайте ошибки 401 (необходима повторная авторизация)
   - При ошибке 409 проверьте, не существует ли уже такая запись

---

## Поддержка

По вопросам использования API обращайтесь к технической документации или в поддержку платформы.
