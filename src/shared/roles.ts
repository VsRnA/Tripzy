export const ROLES = {
  TOURIST: {
    keyWord: 'tourist',
    name: 'Турист',
    requiresClient: false,
  },
  CLIENT_ADMIN: {
    keyWord: 'clientAdmin',
    name: 'Администратор организации',
    requiresClient: true,
  },
  SHOP_ADMIN: {
    keyWord: 'shopAdmin',
    name: 'Администратор магазина',
    requiresClient: true,
  },
} as const;

export type RoleKeyWord = typeof ROLES[keyof typeof ROLES]['keyWord'];

export const ALL_ROLES = Object.values(ROLES);
