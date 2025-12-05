import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';
import db from '#Infrastructure/sequelize';
import Trip from '#App/trips/models/trip.model';

export type TripWaypointAttributes = Attributes<TripWaypoint>;
export type TripWaypointCreationAttributes = CreationAttributes<TripWaypoint>;

export default class TripWaypoint extends Model<InferAttributes<TripWaypoint>, InferCreationAttributes<TripWaypoint>> {
  /** UUID точки маршрута */
  declare guid: CreationOptional<string>;
  /** UUID поездки */
  declare tripGuid: string;
  /** Адрес точки маршрута */
  declare address: string;
  /** Порядковый номер в маршруте */
  declare orderIndex: number;
  /** Дата посещения */
  declare visitDate: string | null;
  /** Описание точки маршрута */
  declare description: string | null;
}

TripWaypoint.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  tripGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  orderIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize: db.instance,
  tableName: 'tripWaypoints',
  modelName: 'tripWaypoint',
  timestamps: false,
});

db.associate(() => {
  TripWaypoint.belongsTo(Trip, {
    foreignKey: 'tripGuid',
    targetKey: 'guid',
    as: 'trip',
  });
});
