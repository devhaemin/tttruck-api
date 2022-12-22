import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_access_logAttributes {
  API_LOG_ID: number;
  USER_ID?: number;
  ACCESS_IP: string;
  ACCESS_DATE: Date;
  IPv4?: number;
  IPv6?: any;
}

export type tt_access_logPk = "API_LOG_ID";
export type tt_access_logId = tt_access_log[tt_access_logPk];
export type tt_access_logOptionalAttributes = "API_LOG_ID" | "USER_ID" | "ACCESS_DATE" | "IPv4" | "IPv6";
export type tt_access_logCreationAttributes = Optional<tt_access_logAttributes, tt_access_logOptionalAttributes>;

export class tt_access_log extends Model<tt_access_logAttributes, tt_access_logCreationAttributes> implements tt_access_logAttributes {
  API_LOG_ID!: number;
  USER_ID?: number;
  ACCESS_IP!: string;
  ACCESS_DATE!: Date;
  IPv4?: number;
  IPv6?: any;

  // tt_access_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_access_log {
    return tt_access_log.init({
    API_LOG_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "접근 로그 ID"
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    ACCESS_IP: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "접근 IP"
    },
    ACCESS_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "접근 날짜"
    },
    IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "IPv4"
    },
    IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "IPv6"
    }
  }, {
    sequelize,
    tableName: 'tt_access_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "API_LOG_ID" },
        ]
      },
      {
        name: "FK_tt_access_log_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
