import crypto from 'crypto';

/**
 * Генерирует API ключ для клиента
 * @returns Случайный API ключ в виде hex строки
 */
export function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}
