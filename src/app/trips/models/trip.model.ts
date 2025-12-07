import db from '#Infrastructure/sequelize';
import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import TripWaypoint from '#App/tripWaypoints/models/tripWaypoint.model';
import User from '#App/users/models/user.model';
import UserTripsAssignment from '#App/userTripsAssignment/models/userTripsAssignment.model';

export type TripAttributes = Attributes<Trip>;
export type TripCreationAttributes = CreationAttributes<Trip>;

/** Цель поездки */
export enum TripGoal {
  forSelf = 'forSelf',
  forColleagues = 'forColleagues',
  forRelatives = 'forRelatives',
  forFriends = 'forFriends',
}

/** Статус поездки */
export enum TripStatus {
  planned = 'planned',
  active = 'active',
  completed = 'completed',
  cancelled = 'cancelled',
}

export default class Trip extends Model<InferAttributes<Trip>, InferCreationAttributes<Trip>> {
  /** UUID поездки */
  declare guid: CreationOptional<string>;
  /** Название поездки */
  declare name: string;
  /** Цель поездки */
  declare goal: TripGoal;
  /** Статус поездки */
  declare status: CreationOptional<TripStatus>;
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
    type: DataTypes.ENUM(...Object.values(TripGoal)),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(TripStatus)),
    allowNull: false,
    defaultValue: TripStatus.planned,
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
