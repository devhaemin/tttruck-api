import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_talkplus_channel, tt_talkplus_channelId } from './tt_talkplus_channel';
import type { tt_talkplus_message, tt_talkplus_messageId } from './tt_talkplus_message';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_user_talkplusAttributes {
  USER_ID: number;
  TALKPLUS_ID: string;
  TALKPLUS_PASSWORD?: string;
  TALKPLUS_USERNAME?: string;
  TALKPLUS_PROFILE_IMAGE_URL?: string;
  TALKPLUS_LOGIN_TOKEN?: string;
  LEAVE_TF: number;
}

export type tt_user_talkplusPk = "TALKPLUS_ID";
export type tt_user_talkplusId = tt_user_talkplus[tt_user_talkplusPk];
export type tt_user_talkplusOptionalAttributes = "TALKPLUS_PASSWORD" | "TALKPLUS_USERNAME" | "TALKPLUS_PROFILE_IMAGE_URL" | "TALKPLUS_LOGIN_TOKEN" | "LEAVE_TF";
export type tt_user_talkplusCreationAttributes = Optional<tt_user_talkplusAttributes, tt_user_talkplusOptionalAttributes>;

export class tt_user_talkplus extends Model<tt_user_talkplusAttributes, tt_user_talkplusCreationAttributes> implements tt_user_talkplusAttributes {
  USER_ID!: number;
  TALKPLUS_ID!: string;
  TALKPLUS_PASSWORD?: string;
  TALKPLUS_USERNAME?: string;
  TALKPLUS_PROFILE_IMAGE_URL?: string;
  TALKPLUS_LOGIN_TOKEN?: string;
  LEAVE_TF!: number;

  // tt_user_talkplus belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_user_talkplus hasMany tt_talkplus_channel via BUYER_ID
  tt_talkplus_channels!: tt_talkplus_channel[];
  getTt_talkplus_channels!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_channel>;
  setTt_talkplus_channels!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  addTt_talkplus_channel!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  addTt_talkplus_channels!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  createTt_talkplus_channel!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_channel>;
  removeTt_talkplus_channel!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  removeTt_talkplus_channels!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  hasTt_talkplus_channel!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  hasTt_talkplus_channels!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  countTt_talkplus_channels!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user_talkplus hasMany tt_talkplus_channel via SELLER_ID
  SELLER_tt_talkplus_channels!: tt_talkplus_channel[];
  getSELLER_tt_talkplus_channels!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_channel>;
  setSELLER_tt_talkplus_channels!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  addSELLER_tt_talkplus_channel!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  addSELLER_tt_talkplus_channels!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  createSELLER_tt_talkplus_channel!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_channel>;
  removeSELLER_tt_talkplus_channel!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  removeSELLER_tt_talkplus_channels!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  hasSELLER_tt_talkplus_channel!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  hasSELLER_tt_talkplus_channels!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_channel, tt_talkplus_channelId>;
  countSELLER_tt_talkplus_channels!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user_talkplus hasMany tt_talkplus_message via SEND_USER_TALKPLUS_ID
  tt_talkplus_messages!: tt_talkplus_message[];
  getTt_talkplus_messages!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_message>;
  setTt_talkplus_messages!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  addTt_talkplus_message!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  addTt_talkplus_messages!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  createTt_talkplus_message!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_message>;
  removeTt_talkplus_message!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  removeTt_talkplus_messages!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  hasTt_talkplus_message!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  hasTt_talkplus_messages!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  countTt_talkplus_messages!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_user_talkplus {
    return tt_user_talkplus.init({
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      },
      unique: "tt_user_talkplus_tt_user_USER_ID_fk"
    },
    TALKPLUS_ID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    TALKPLUS_PASSWORD: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TALKPLUS_USERNAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TALKPLUS_PROFILE_IMAGE_URL: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    TALKPLUS_LOGIN_TOKEN: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    LEAVE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tt_user_talkplus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TALKPLUS_ID" },
        ]
      },
      {
        name: "tt_user_talkplus_pk",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TALKPLUS_ID" },
        ]
      },
      {
        name: "tt_user_ID_talkplus_pk",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
