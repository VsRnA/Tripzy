import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import UserRoleAssignment from '#App/userRoleAssignments/models/userRoleAssignment.model';
import UserRole from '#App/userRoles/models/userRole.model';
import Client from '#App/clients/models/client.model';
import ShopAdministrator from '#App/shopAdministrators/models/shopAdministrator.model';
import UserTripsAssignment from '#App/userTripsAssignment/models/userTripsAssignment.model';
import Trip from '#App/trips/models/trip.model';

export type UserAttributes = Attributes<User>;
export type UserCreationAttributes = CreationAttributes<User>;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /** UUID пользователя */
  declare guid: CreationOptional<string>;
  /** Email пользователя */
  declare email: string;
  /** Hash пароль пользователя */
  declare password: string;
  /** Имя пользователя */
  declare firstName: string;
  /** Фамилия пользователя */
  declare lastName: string | null;
  /** Отчество пользователя */
  declare patronymicName: string | null;
  /** Телефон пользователя */
  declare phone: string | null;
  /** Страна пользователя */
  declare country: string | null;
  /** Возраст пользователя */
  declare age: number | null;
  /** Идентификатор клиента */
  declare clientId: number | null; 
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

User.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  patronymicName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize: db.instance,
  tableName: 'users',
  modelName: 'user',
  paranoid: true,
  timestamps: true,
});

db.associate(() => {
  User.belongsTo(Client, {
    foreignKey: 'clientId',
    targetKey: 'id',
    as: 'client',
  });

  User.belongsToMany(UserRole, {
    through: UserRoleAssignment,
    foreignKey: 'userGuid',
    otherKey: 'roleId',
    as: 'roles',
  });

  User.hasMany(ShopAdministrator, {
    foreignKey: 'userGuid',
    as: 'shopAdministrators',
  });

  User.belongsToMany(Trip, {
    through: UserTripsAssignment,
    foreignKey: 'userGuid',
    otherKey: 'tripGuid',
    as: 'trips',
  });
});