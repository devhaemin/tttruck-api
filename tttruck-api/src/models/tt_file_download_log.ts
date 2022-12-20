import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {tt_file, tt_fileId} from './tt_file';
import type {tt_user, tt_userId} from './tt_user';

export interface tt_file_download_logAttributes {
  FILE_DOWN_LOG_ID: number;
  FILE_ID: number;
  USER_ID: number;
  FILE_DOWNLOAD_DATE: Date;
  FILE_TYPE?: string;
  IPv4?: number;
  IPv6?: any;
  time?: Date;
}

export type tt_file_download_logPk = "FILE_DOWN_LOG_ID";
export type tt_file_download_logId = tt_file_download_log[tt_file_download_logPk];
export type tt_file_download_logOptionalAttributes =
  "FILE_DOWNLOAD_DATE"
  | "FILE_TYPE"
  | "IPv4"
  | "IPv6"
  | "time";
export type tt_file_download_logCreationAttributes = Optional<tt_file_download_logAttributes, tt_file_download_logOptionalAttributes>;

export class tt_file_download_log extends Model<tt_file_download_logAttributes, tt_file_download_logCreationAttributes> implements tt_file_download_logAttributes {
  FILE_DOWN_LOG_ID!: number;
  FILE_ID!: number;
  USER_ID!: number;
  FILE_DOWNLOAD_DATE!: Date;
  FILE_TYPE?: string;
  IPv4?: number;
  IPv6?: any;
  time?: Date;

  // tt_file_download_log belongsTo tt_file via FILE_ID
  FILE!: tt_file;
  getFILE!: Sequelize.BelongsToGetAssociationMixin<tt_file>;
  setFILE!: Sequelize.BelongsToSetAssociationMixin<tt_file, tt_fileId>;
  createFILE!: Sequelize.BelongsToCreateAssociationMixin<tt_file>;
  // tt_file_download_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_file_download_log {
    return tt_file_download_log.init({
      FILE_DOWN_LOG_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: "파일 다운로드 로그 ID",
      },
      FILE_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "파일 ID",
        references: {
          model: 'tt_file',
          key: 'FILE_ID',
        },
      },
      USER_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "사용자 ID",
        references: {
          model: 'tt_user',
          key: 'USER_ID',
        },
      },
      FILE_DOWNLOAD_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('curtime'),
        comment: "파일 다운로드 날짜",
      },
      FILE_TYPE: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "파일 타입",
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
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      },
    }, {
      sequelize,
      tableName: 'tt_file_download_log',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {name: "FILE_DOWN_LOG_ID"},
          ],
        },
        {
          name: "FK_tt_file_download_log_USER_ID_tt_user_USER_ID",
          using: "BTREE",
          fields: [
            {name: "USER_ID"},
          ],
        },
        {
          name: "FK_tt_file_download_log_FILE_ID_tt_file_FILE_ID",
          using: "BTREE",
          fields: [
            {name: "FILE_ID"},
          ],
        },
      ],
    });
  }
}
