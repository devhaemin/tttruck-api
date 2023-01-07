import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_talkplus_channel, tt_talkplus_channelId } from './tt_talkplus_channel';
import type { tt_talkplus_file, tt_talkplus_fileId } from './tt_talkplus_file';
import type { tt_user, tt_userId } from './tt_user';
import type { tt_user_talkplus, tt_user_talkplusId } from './tt_user_talkplus';

export interface tt_talkplus_messageAttributes {
  MESSAGE_ID: number;
  TALKPLUS_CHANNEL_ID: string;
  SEND_USER_ID: number;
  SEND_USER_TALKPLUS_ID: string;
  TEXT: string;
  DATA?: string;
}

export type tt_talkplus_messagePk = "MESSAGE_ID";
export type tt_talkplus_messageId = tt_talkplus_message[tt_talkplus_messagePk];
export type tt_talkplus_messageOptionalAttributes = "MESSAGE_ID" | "DATA";
export type tt_talkplus_messageCreationAttributes = Optional<tt_talkplus_messageAttributes, tt_talkplus_messageOptionalAttributes>;

export class tt_talkplus_message extends Model<tt_talkplus_messageAttributes, tt_talkplus_messageCreationAttributes> implements tt_talkplus_messageAttributes {
  MESSAGE_ID!: number;
  TALKPLUS_CHANNEL_ID!: string;
  SEND_USER_ID!: number;
  SEND_USER_TALKPLUS_ID!: string;
  TEXT!: string;
  DATA?: string;

  // tt_talkplus_message belongsTo tt_talkplus_channel via TALKPLUS_CHANNEL_ID
  TALKPLUS_CHANNEL!: tt_talkplus_channel;
  getTALKPLUS_CHANNEL!: Sequelize.BelongsToGetAssociationMixin<tt_talkplus_channel>;
  setTALKPLUS_CHANNEL!: Sequelize.BelongsToSetAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  createTALKPLUS_CHANNEL!: Sequelize.BelongsToCreateAssociationMixin<tt_talkplus_channel>;
  // tt_talkplus_message hasMany tt_talkplus_file via MESSAGE_ID
  tt_talkplus_files!: tt_talkplus_file[];
  getTt_talkplus_files!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_file>;
  setTt_talkplus_files!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  addTt_talkplus_file!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  addTt_talkplus_files!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  createTt_talkplus_file!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_file>;
  removeTt_talkplus_file!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  removeTt_talkplus_files!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  hasTt_talkplus_file!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  hasTt_talkplus_files!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  countTt_talkplus_files!: Sequelize.HasManyCountAssociationsMixin;
  // tt_talkplus_message belongsTo tt_user via SEND_USER_ID
  SEND_USER!: tt_user;
  getSEND_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSEND_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSEND_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_talkplus_message belongsTo tt_user_talkplus via SEND_USER_TALKPLUS_ID
  SEND_USER_TALKPLU!: tt_user_talkplus;
  getSEND_USER_TALKPLU!: Sequelize.BelongsToGetAssociationMixin<tt_user_talkplus>;
  setSEND_USER_TALKPLU!: Sequelize.BelongsToSetAssociationMixin<tt_user_talkplus, tt_user_talkplusId>;
  createSEND_USER_TALKPLU!: Sequelize.BelongsToCreateAssociationMixin<tt_user_talkplus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_talkplus_message {
    return tt_talkplus_message.init({
    MESSAGE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    TALKPLUS_CHANNEL_ID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'tt_talkplus_channel',
        key: 'TALKPLUS_CHANNEL_ID'
      }
    },
    SEND_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    SEND_USER_TALKPLUS_ID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'tt_user_talkplus',
        key: 'TALKPLUS_ID'
      }
    },
    TEXT: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    DATA: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tt_talkplus_message',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MESSAGE_ID" },
        ]
      },
      {
        name: "tt_talkplus_message_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "SEND_USER_ID" },
        ]
      },
      {
        name: "tt_talkplus_message_tt_user_talkplus_null_fk",
        using: "BTREE",
        fields: [
          { name: "SEND_USER_TALKPLUS_ID" },
        ]
      },
      {
        name: "tt_talkplus_message_tt_talkplus_channel_null_fk",
        using: "BTREE",
        fields: [
          { name: "TALKPLUS_CHANNEL_ID" },
        ]
      },
    ]
  });
  }
}
