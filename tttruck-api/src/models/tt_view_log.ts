import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_view_logAttributes {
  VIEW_LOG_ID: number;
  CONTENT_TYPE: string;
  USER_ID?: number;
  TIME?: Date;
  IPv4?: number;
  IPv6?: any;
}

export type tt_view_logPk = "VIEW_LOG_ID";
export type tt_view_logId = tt_view_log[tt_view_logPk];
export type tt_view_logOptionalAttributes = "VIEW_LOG_ID" | "USER_ID" | "TIME" | "IPv4" | "IPv6";
export type tt_view_logCreationAttributes = Optional<tt_view_logAttributes, tt_view_logOptionalAttributes>;

export class tt_view_log extends Model<tt_view_logAttributes, tt_view_logCreationAttributes> implements tt_view_logAttributes {
  VIEW_LOG_ID!: number;
  CONTENT_TYPE!: string;
  USER_ID?: number;
  TIME?: Date;
  IPv4?: number;
  IPv6?: any;

  // tt_view_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_view_log {
    return tt_view_log.init({
    VIEW_LOG_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "뷰 로그 ID"
    },
    CONTENT_TYPE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "컨텐츠 타입"
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "로그인 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "날짜"
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
    tableName: 'tt_view_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "VIEW_LOG_ID" },
        ]
      },
      {
        name: "FK_tt_view_log_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
