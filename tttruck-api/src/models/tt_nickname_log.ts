import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_nickname_logAttributes {
  NICKNAME_LOG_ID: number;
  ORIGIN_NICKNAME: string;
  CHANGE_NICKNAME: string;
  USER_ID?: number;
  IPv4?: number;
  IPv6?: any;
  time: Date;
}

export type tt_nickname_logPk = "NICKNAME_LOG_ID";
export type tt_nickname_logId = tt_nickname_log[tt_nickname_logPk];
export type tt_nickname_logOptionalAttributes = "USER_ID" | "IPv4" | "IPv6" | "time";
export type tt_nickname_logCreationAttributes = Optional<tt_nickname_logAttributes, tt_nickname_logOptionalAttributes>;

export class tt_nickname_log extends Model<tt_nickname_logAttributes, tt_nickname_logCreationAttributes> implements tt_nickname_logAttributes {
  NICKNAME_LOG_ID!: number;
  ORIGIN_NICKNAME!: string;
  CHANGE_NICKNAME!: string;
  USER_ID?: number;
  IPv4?: number;
  IPv6?: any;
  time!: Date;

  // tt_nickname_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_nickname_log {
    return tt_nickname_log.init({
    NICKNAME_LOG_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "닉네임 변경 로그 ID"
    },
    ORIGIN_NICKNAME: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "기존 닉네임"
    },
    CHANGE_NICKNAME: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "변경 닉네임"
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
    IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "IPv4"
    },
    IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "IPv6"
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "변경날짜"
    }
  }, {
    sequelize,
    tableName: 'tt_nickname_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NICKNAME_LOG_ID" },
        ]
      },
      {
        name: "FK_tt_nickname_log_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
