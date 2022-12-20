import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {tt_user, tt_userId} from './tt_user';

export interface tt_login_logAttributes {
  LOGIN_LOG_ID: number;
  USER_ID: number;
  SNS_TYPE: string;
  IPv4?: number;
  IPv6?: any;
  time: Date;
}

export type tt_login_logPk = "LOGIN_LOG_ID";
export type tt_login_logId = tt_login_log[tt_login_logPk];
export type tt_login_logOptionalAttributes =
  "SNS_TYPE"
  | "IPv4"
  | "IPv6"
  | "time";
export type tt_login_logCreationAttributes = Optional<tt_login_logAttributes, tt_login_logOptionalAttributes>;

export class tt_login_log extends Model<tt_login_logAttributes, tt_login_logCreationAttributes> implements tt_login_logAttributes {
  LOGIN_LOG_ID!: number;
  USER_ID!: number;
  SNS_TYPE!: string;
  IPv4?: number;
  IPv6?: any;
  time!: Date;

  // tt_login_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_login_log {
    return tt_login_log.init({
      LOGIN_LOG_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: "로그인 로그 ID",
      },
      USER_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "유저 ID",
        references: {
          model: 'tt_user',
          key: 'USER_ID',
        },
      },
      SNS_TYPE: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "email",
        comment: "SNS 타입",
      },
      IPv4: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "IPv4",
      },
      IPv6: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "IPv6",
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
        comment: "로그인날짜",
      },
    }, {
      sequelize,
      tableName: 'tt_login_log',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {name: "LOGIN_LOG_ID"},
          ],
        },
        {
          name: "FK_tt_login_log_USER_ID_tt_user_USER_ID",
          using: "BTREE",
          fields: [
            {name: "USER_ID"},
          ],
        },
      ],
    });
  }
}
