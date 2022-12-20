import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';

export interface tt_alarmAttributes {
  NOTIFICATION_ID: number;
  USER_ID: number;
  SUBJECT: string;
  CONTENTS?: string;
  VIEW_TF?: number;
  IMAGEURL?: string;
  TIME: Date;
}

export type tt_alarmPk = "NOTIFICATION_ID";
export type tt_alarmId = tt_alarm[tt_alarmPk];
export type tt_alarmOptionalAttributes =
  "NOTIFICATION_ID"
  | "CONTENTS"
  | "VIEW_TF"
  | "IMAGEURL"
  | "TIME";
export type tt_alarmCreationAttributes = Optional<tt_alarmAttributes, tt_alarmOptionalAttributes>;

export class tt_alarm extends Model<tt_alarmAttributes, tt_alarmCreationAttributes> implements tt_alarmAttributes {
  NOTIFICATION_ID!: number;
  USER_ID!: number;
  SUBJECT!: string;
  CONTENTS?: string;
  VIEW_TF?: number;
  IMAGEURL?: string;
  TIME!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof tt_alarm {
    return tt_alarm.init({
      NOTIFICATION_ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      USER_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      SUBJECT: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "알림 제목",
      },
      CONTENTS: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "알림 내용",
      },
      VIEW_TF: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IMAGEURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TIME: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      },
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
            {name: "NOTIFICATION_ID"},
          ],
        },
      ],
    });
  }
}
