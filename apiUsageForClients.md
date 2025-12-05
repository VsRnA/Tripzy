# API для загрузки данных клиентов

Этот документ описывает использование API для регистрации клиентов и массовой загрузки данных (магазинов, администраторов, товаров и тегов).

## Обзор

API предоставляет следующие эндпоинты:

1. **POST /api/clients/v1/register** - Регистрация нового клиента
2. **POST /api/clients/v1/shops/bulk** - Массовая загрузка магазинов
3. **POST /api/clients/v1/shop-administrators/bulk** - Массовая загрузка администраторов магазинов
4. **POST /api/clients/v1/products/bulk** - Массовая загрузка товаров (сувениров)
5. **POST /api/clients/v1/product-tags/bulk** - Массовая загрузка тегов для товаров

## Аутентификация

Все эндпоинты, кроме регистрации клиента, требуют API ключ в заголовке запроса:

```
X-API-Key: ваш_api_ключ
```

API ключ выдается при регистрации клиента.

## 1. Регистрация клиента

### Запрос

```http
POST /api/clients/v1/register
Content-Type: application/json

{
  "name": "Название вашей компании"
}
```

### Ответ

```json
{
  "data": {
    "client": {
      "guid": "uuid-клиента",
      "name": "Название вашей компании",
      "apiKey": "ваш_api_ключ_для_дальнейших_запросов",
      "removalMark": false,
      "createdAt": "2025-12-05T10:00:00.000Z",
      "updatedAt": "2025-12-05T10:00:00.000Z"
    }
  }
}
```

**Важно:** Сохраните `apiKey` - он понадобится для всех последующих запросов.

## 2. Загрузка магазинов

### Запрос

```http
POST /api/clients/v1/shops/bulk
Content-Type: application/json
X-API-Key: ваш_api_ключ

{
  "shops": [
    {
      "name": "Сувениры России",
      "address": "ул. Ленина, д. 10",
      "city": "Москва",
      "region": "Москва",
      "schedule": {
        "monday": "10:00-20:00",
        "tuesday": "10:00-20:00",
        "wednesday": "10:00-20:00",
        "thursday": "10:00-20:00",
        "friday": "10:00-20:00",
        "saturday": "10:00-18:00",
        "sunday": "10:00-18:00"
      }
    },
    {
      "name": "Русские традиции",
      "address": "Невский проспект, д. 25",
      "city": "Санкт-Петербург",
      "region": "Ленинградская область",
      "schedule": null
    }
  ]
}
```

### Ответ

```json
{
  "data": {
    "shops": [
      {
        "guid": "uuid-магазина-1",
        "clientGuid": "uuid-клиента",
        "name": "Сувениры России",
        "address": "ул. Ленина, д. 10",
        "city": "Москва",
        "region": "Москва",
        "schedule": { "monday": "10:00-20:00", ... },
        "removalMark": false,
        "createdAt": "2025-12-05T10:00:00.000Z",
        "updatedAt": "2025-12-05T10:00:00.000Z"
      },
      ...
    ],
    "count": 2
  }
}
```

**Важно:** Сохраните `guid` каждого магазина для последующих операций.

## 3. Загрузка администраторов магазинов

### Запрос

```http
POST /api/clients/v1/shop-administrators/bulk
Content-Type: application/json
X-API-Key: ваш_api_ключ

{
  "administrators": [
    {
      "shopGuid": "uuid-магазина-1",
      "email": "admin1@example.com",
      "password": "password123",
      "firstName": "Иван",
      "lastName": "Иванов",
      "patronymicName": "Иванович",
      "phone": "+79001234567",
      "country": "Россия",
      "age": 35
    },
    {
      "shopGuid": "uuid-магазина-2",
      "email": "admin2@example.com",
      "password": "password456",
      "firstName": "Петр",
      "lastName": null,
      "patronymicName": null,
      "phone": null,
      "country": null,
      "age": null
    }
  ]
}
```

### Ответ

```json
{
  "data": {
    "administrators": [
      {
        "shopGuid": "uuid-магазина-1",
        "userGuid": "uuid-пользователя-1",
        "user": {
          "guid": "uuid-пользователя-1",
          "email": "admin1@example.com",
          "firstName": "Иван",
          "lastName": "Иванов",
          "patronymicName": "Иванович",
          "phone": "+79001234567",
          "country": "Россия",
          "age": 35
        }
      },
      ...
    ],
    "count": 2
  }
}
```

## 4. Загрузка товаров (сувениров)

### Запрос

```http
POST /api/clients/v1/products/bulk
Content-Type: application/json
X-API-Key: ваш_api_ключ

{
  "products": [
    {
      "shopGuid": "uuid-магазина-1",
      "name": "Матрёшка классическая",
      "price": 1500,
      "quantity": 50
    },
    {
      "shopGuid": "uuid-магазина-1",
      "name": "Шкатулка палех",
      "price": 2500,
      "quantity": 30
    },
    {
      "shopGuid": "uuid-магазина-2",
      "name": "Самовар декоративный",
      "price": 5000,
      "quantity": 10
    }
  ]
}
```

### Ответ

```json
{
  "data": {
    "products": [
      {
        "guid": "uuid-товара-1",
        "shopGuid": "uuid-магазина-1",
        "name": "Матрёшка классическая",
        "price": 1500,
        "quantity": 50,
        "removalMark": false,
        "createdAt": "2025-12-05T10:00:00.000Z",
        "updatedAt": "2025-12-05T10:00:00.000Z"
      },
      ...
    ],
    "count": 3
  }
}
```

**Важно:** Сохраните `guid` каждого товара для загрузки тегов.

## 5. Загрузка тегов для товаров

### Запрос

```http
POST /api/clients/v1/product-tags/bulk
Content-Type: application/json
X-API-Key: ваш_api_ключ

{
  "productTags": [
    {
      "productGuid": "uuid-товара-1",
      "tag": "children"
    },
    {
      "productGuid": "uuid-товара-1",
      "tag": "relatives"
    },
    {
      "productGuid": "uuid-товара-2",
      "tag": "friends"
    },
    {
      "productGuid": "uuid-товара-2",
      "tag": "colleagues"
    }
  ]
}
```

### Доступные теги

- `children` - для детей
- `relatives` - для родственников
- `colleagues` - для коллег
- `friends` - для друзей
- `partner` - для партнера
- `parents` - для родителей
- `myself` - для себя
- `other` - прочее

### Ответ

```json
{
  "data": {
    "productTags": [
      {
        "productGuid": "uuid-товара-1",
        "tag": "children",
        "createdAt": "2025-12-05T10:00:00.000Z",
        "updatedAt": "2025-12-05T10:00:00.000Z"
      },
      ...
    ],
    "count": 4
  }
}
```

## Пример полного процесса загрузки данных

```bash
# 1. Регистрация клиента
curl -X POST http://localhost:3000/api/clients/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Моя компания"}'

# Сохраните apiKey из ответа

# 2. Загрузка магазинов
curl -X POST http://localhost:3000/api/clients/v1/shops/bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ваш_api_ключ" \
  -d '{
    "shops": [
      {
        "name": "Магазин 1",
        "address": "ул. Примерная, 1",
        "city": "Москва",
        "region": "Москва",
        "schedule": null
      }
    ]
  }'

# Сохраните guid магазинов

# 3. Загрузка администраторов
curl -X POST http://localhost:3000/api/clients/v1/shop-administrators/bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ваш_api_ключ" \
  -d '{
    "administrators": [
      {
        "shopGuid": "uuid-магазина",
        "email": "admin@example.com",
        "password": "password123",
        "firstName": "Иван"
      }
    ]
  }'

# 4. Загрузка товаров
curl -X POST http://localhost:3000/api/clients/v1/products/bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ваш_api_ключ" \
  -d '{
    "products": [
      {
        "shopGuid": "uuid-магазина",
        "name": "Матрёшка",
        "price": 1500,
        "quantity": 50
      }
    ]
  }'

# Сохраните guid товаров

# 5. Загрузка тегов
curl -X POST http://localhost:3000/api/clients/v1/product-tags/bulk \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ваш_api_ключ" \
  -d '{
    "productTags": [
      {
        "productGuid": "uuid-товара",
        "tag": "children"
      }
    ]
  }'
```

## Обработка ошибок

### Ошибка 400 - Bad Request
Некорректные данные в запросе. Проверьте формат JSON и обязательные поля.

### Ошибка 401 - Unauthorized
Отсутствует или неверный API ключ в заголовке `X-API-Key`.

### Ошибка 404 - Not Found
Указанный ресурс не найден (например, магазин с таким guid не существует или не принадлежит клиенту).

### Ошибка 409 - Conflict
Сущность уже существует (например, клиент с таким именем или email уже зарегистрирован).

## Swagger UI

Для более удобного тестирования API вы можете использовать Swagger UI, доступный по адресу:

```
http://localhost:3000/docs
```

Swagger предоставляет интерактивную документацию и позволяет тестировать эндпоинты прямо из браузера.
