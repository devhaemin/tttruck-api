import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_talkplus_message, tt_talkplus_messageId } from './tt_talkplus_message';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_talkplus_fileAttributes {
  TALKPLUS_FILE_ID: number;
  MESSAGE_ID: number;
  USER_ID?: number;
  FILE_NAME: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  FILE_URL?: string;
  FILE_TYPE?: string;
  TIME: Date;
}

export type tt_talkplus_filePk = "TALKPLUS_FILE_ID";
export type tt_talkplus_fileId = tt_talkplus_file[tt_talkplus_filePk];
export type tt_talkplus_fileOptionalAttributes = "TALKPLUS_FILE_ID" | "USER_ID" | "FILE_PATH" | "FILE_SIZE" | "FILE_URL" | "FILE_TYPE" | "TIME";
export type tt_talkplus_fileCreationAttributes = Optional<tt_talkplus_fileAttributes, tt_talkplus_fileOptionalAttributes>;

export class tt_talkplus_file extends Model<tt_talkplus_fileAttributes, tt_talkplus_fileCreationAttributes> implements tt_talkplus_fileAttributes {
  TALKPLUS_FILE_ID!: number;
  MESSAGE_ID!: number;
  USER_ID?: number;
  FILE_NAME!: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  FILE_URL?: string;
  FILE_TYPE?: string;
  TIME!: Date;

  // tt_talkplus_file belongsTo tt_talkplus_message via MESSAGE_ID
  MESSAGE!: tt_talkplus_message;
  getMESSAGE!: Sequelize.BelongsToGetAssociationMixin<tt_talkplus_message>;
  setMESSAGE!: Sequelize.BelongsToSetAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  createMESSAGE!: Sequelize.BelongsToCreateAssociationMixin<tt_talkplus_message>;
  // tt_talkplus_file belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_talkplus_file {
    return tt_talkplus_file.init({
    TALKPLUS_FILE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    MESSAGE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_talkplus_message',
        key: 'MESSAGE_ID'
      }
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    FILE_NAME: {
      type: DataTypes.STRING(800),
      allowNull: false
    },
    FILE_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    FILE_SIZE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FILE_URL: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    FILE_TYPE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_talkplus_file',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TALKPLUS_FILE_ID" },
        ]
      },
      {
        name: "tt_talkplus_file_tt_talkplus_message_null_fk",
        using: "BTREE",
        fields: [
          { name: "MESSAGE_ID" },
        ]
      },
      {
        name: "tt_talkplus_file_tt_user_USER_ID_fk",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
