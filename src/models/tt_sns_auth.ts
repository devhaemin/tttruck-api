import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_sns_authAttributes {
  SNS_AUTH_ID: number;
  USER_ID?: number;
  SNS_TYPE: string;
  APP_ID: string;
  PASSWORD?: string;
  APP_USER_NAME: string;
  SNS_TOKEN_KEY?: string;
  NICKNAME?: string;
  RETURN_DATA?: string;
  REGISTER_DATE?: Date;
  UPDATE_DATE?: Date;
}

export type tt_sns_authPk = "SNS_AUTH_ID";
export type tt_sns_authId = tt_sns_auth[tt_sns_authPk];
export type tt_sns_authOptionalAttributes = "SNS_AUTH_ID" | "USER_ID" | "PASSWORD" | "SNS_TOKEN_KEY" | "NICKNAME" | "RETURN_DATA" | "REGISTER_DATE" | "UPDATE_DATE";
export type tt_sns_authCreationAttributes = Optional<tt_sns_authAttributes, tt_sns_authOptionalAttributes>;

export class tt_sns_auth extends Model<tt_sns_authAttributes, tt_sns_authCreationAttributes> implements tt_sns_authAttributes {
  SNS_AUTH_ID!: number;
  USER_ID?: number;
  SNS_TYPE!: string;
  APP_ID!: string;
  PASSWORD?: string;
  APP_USER_NAME!: string;
  SNS_TOKEN_KEY?: string;
  NICKNAME?: string;
  RETURN_DATA?: string;
  REGISTER_DATE?: Date;
  UPDATE_DATE?: Date;

  // tt_sns_auth belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_sns_auth {
    return tt_sns_auth.init({
    SNS_AUTH_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "SNS AUTH ID"
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
    SNS_TYPE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "SNS 타입"
    },
    APP_ID: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "앱 사용자 고유ID (일련번호)"
    },
    PASSWORD: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "SNS 패스워드"
    },
    APP_USER_NAME: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "앱 사용자 Username (ex. 앱 아이디, 앱 별명)"
    },
    SNS_TOKEN_KEY: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "SNS 인증 토큰 키"
    },
    NICKNAME: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "닉네임"
    },
    RETURN_DATA: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "롤백 URL 반환값"
    },
    REGISTER_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "가입일"
    },
    UPDATE_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일"
    }
  }, {
    sequelize,
    tableName: 'tt_sns_auth',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SNS_AUTH_ID" },
        ]
      },
      {
        name: "FK_tt_sns_auth_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
