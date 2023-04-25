import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_alarmAttributes {
  ALARM_ID: number;
  USER_ID: number;
  FCM_MSG_ID?: string;
  SUBJECT: string;
  CONTENTS?: string;
  REDIRECT_URL?: string;
  VIEW_TF: number;
  IMAGEURL?: string;
  TIME: Date;
}

export type tt_alarmPk = "ALARM_ID";
export type tt_alarmId = tt_alarm[tt_alarmPk];
export type tt_alarmOptionalAttributes = "ALARM_ID" | "FCM_MSG_ID" | "CONTENTS" | "REDIRECT_URL" | "VIEW_TF" | "IMAGEURL" | "TIME";
export type tt_alarmCreationAttributes = Optional<tt_alarmAttributes, tt_alarmOptionalAttributes>;

export class tt_alarm extends Model<tt_alarmAttributes, tt_alarmCreationAttributes> implements tt_alarmAttributes {
  ALARM_ID!: number;
  USER_ID!: number;
  FCM_MSG_ID?: string;
  SUBJECT!: string;
  CONTENTS?: string;
  REDIRECT_URL?: string;
  VIEW_TF!: number;
  IMAGEURL?: string;
  TIME!: Date;

  // tt_alarm belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_alarm {
    return tt_alarm.init({
    ALARM_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    FCM_MSG_ID: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SUBJECT: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "알림 제목"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "알림 내용"
    },
    REDIRECT_URL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    VIEW_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    IMAGEURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_alarm',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ALARM_ID" },
        ]
      },
      {
        name: "tt_alarm_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
