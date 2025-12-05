import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import UserTripsAssignment from '#App/userTripsAssignment/models/userTripsAssignment.model';
import User from '#App/users/models/user.model';
import TripWaypoint from '#App/tripWaypoints/models/tripWaypoint.model';

export type TripAttributes = Attributes<Trip>;
export type TripCreationAttributes = CreationAttributes<Trip>;

export default class Trip extends Model<InferAttributes<Trip>, InferCreationAttributes<Trip>> {
  /** UUID поездки */
  declare guid: CreationOptional<string>;
  /** Название поездки */
  declare name: string;
  /** Цель поездки: FOR_SELF, FOR_COLLEAGUES, FOR_RELATIVES */
  declare goal: string;
  /** Статус поездки: PLANNED, ACTIVE, COMPLETED, CANCELLED */
  declare status: CreationOptional<string>;
  /** Минимальный бюджет */
  declare budgetMin: number | null;
  /** Максимальный бюджет */
  declare budgetMax: number | null;
  /** Пометка на удаление */
  declare removalMark: CreationOptional<boolean>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

Trip.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  goal: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'PLANNED',
  },
  budgetMin: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  budgetMax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  removalMark: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'trips',
  modelName: 'trip',
  timestamps: true,
});

db.associate(() => {
  Trip.belongsToMany(User, {
    through: UserTripsAssignment,
    foreignKey: 'tripGuid',
    otherKey: 'userGuid',
    as: 'users',
  });

  Trip.hasMany(TripWaypoint, {
    foreignKey: 'tripGuid',
    as: 'waypoints',
  });
});
