/**
 * Координаты точки (широта и долгота)
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Вычисляет расстояние между двумя точками по их координатам
 * используя формулу Haversine
 *
 * @param point1 - Координаты первой точки
 * @param point2 - Координаты второй точки
 * @returns Расстояние в километрах
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const earthRadiusKm = 6371;

  const lat1Rad = toRadians(point1.latitude);
  const lat2Rad = toRadians(point2.latitude);
  const deltaLatRad = toRadians(point2.latitude - point1.latitude);
  const deltaLonRad = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}

/**
 * Конвертирует градусы в радианы
 *
 * @param degrees - Значение в градусах
 * @returns Значение в радианах
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
