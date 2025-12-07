import db from '#Infrastructure/sequelize';
import {
  Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional,
} from '#Lib/database/sequelize';

export type UserTripsAssignmentAttributes = Attributes<UserTripsAssignment>;
export type UserTripsAssignmentCreationAttributes = CreationAttributes<UserTripsAssignment>;

export default class UserTripsAssignment extends Model<InferAttributes<UserTripsAssignment>, InferCreationAttributes<UserTripsAssignment>> {
  /** UUID связи */
  declare guid: CreationOptional<string>;
  /** UUID пользователя */
  declare userGuid: string;
  /** UUID поездки */
  declare tripGuid: string;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
}

UserTripsAssignment.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tripGuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize: db.instance,
  tableName: 'userTripsAssignment',
  modelName: 'userTripsAssignment',
  timestamps: true,
});
