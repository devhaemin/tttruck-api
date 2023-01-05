import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_talkplus_message, tt_talkplus_messageId } from './tt_talkplus_message';
import type { tt_user_talkplus, tt_user_talkplusId } from './tt_user_talkplus';

export interface tt_talkplus_channelAttributes {
  CHANNEL_ID: number;
  TALKPLUS_CHANNEL_ID: string;
  PRODUCT_ID: number;
  NAME?: string;
  BUYER_ID: string;
  TYPE?: string;
  IMAGE_URL?: string;
  MAX_MEMBER_COUNT: number;
  STATUS: number;
  SELLER_ID?: string;
  LASTCHAT_TIME: Date;
}

export type tt_talkplus_channelPk = "CHANNEL_ID";
export type tt_talkplus_channelId = tt_talkplus_channel[tt_talkplus_channelPk];
export type tt_talkplus_channelOptionalAttributes = "CHANNEL_ID" | "NAME" | "TYPE" | "IMAGE_URL" | "MAX_MEMBER_COUNT" | "STATUS" | "SELLER_ID" | "LASTCHAT_TIME";
export type tt_talkplus_channelCreationAttributes = Optional<tt_talkplus_channelAttributes, tt_talkplus_channelOptionalAttributes>;

export class tt_talkplus_channel extends Model<tt_talkplus_channelAttributes, tt_talkplus_channelCreationAttributes> implements tt_talkplus_channelAttributes {
  CHANNEL_ID!: number;
  TALKPLUS_CHANNEL_ID!: string;
  PRODUCT_ID!: number;
  NAME?: string;
  BUYER_ID!: string;
  TYPE?: string;
  IMAGE_URL?: string;
  MAX_MEMBER_COUNT!: number;
  STATUS!: number;
  SELLER_ID?: string;
  LASTCHAT_TIME!: Date;

  // tt_talkplus_channel belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_talkplus_channel hasMany tt_talkplus_message via TALKPLUS_CHANNEL_ID
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
  // tt_talkplus_channel belongsTo tt_user_talkplus via BUYER_ID
  BUYER!: tt_user_talkplus;
  getBUYER!: Sequelize.BelongsToGetAssociationMixin<tt_user_talkplus>;
  setBUYER!: Sequelize.BelongsToSetAssociationMixin<tt_user_talkplus, tt_user_talkplusId>;
  createBUYER!: Sequelize.BelongsToCreateAssociationMixin<tt_user_talkplus>;
  // tt_talkplus_channel belongsTo tt_user_talkplus via SELLER_ID
  SELLER!: tt_user_talkplus;
  getSELLER!: Sequelize.BelongsToGetAssociationMixin<tt_user_talkplus>;
  setSELLER!: Sequelize.BelongsToSetAssociationMixin<tt_user_talkplus, tt_user_talkplusId>;
  createSELLER!: Sequelize.BelongsToCreateAssociationMixin<tt_user_talkplus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_talkplus_channel {
    return tt_talkplus_channel.init({
    CHANNEL_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    TALKPLUS_CHANNEL_ID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "tt_talkplus_channel_pk"
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    NAME: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    BUYER_ID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'tt_user_talkplus',
        key: 'TALKPLUS_ID'
      }
    },
    TYPE: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    IMAGE_URL: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    MAX_MEMBER_COUNT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    SELLER_ID: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: 'tt_user_talkplus',
        key: 'TALKPLUS_ID'
      }
    },
    LASTCHAT_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_talkplus_channel',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CHANNEL_ID" },
        ]
      },
      {
        name: "tt_talkplus_channel_pk",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TALKPLUS_CHANNEL_ID" },
        ]
      },
      {
        name: "tt_talkplus_channel_product_buyer",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BUYER_ID" },
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "tt_talkplus_channel_tt_product_null_fk",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "tt_talkplus_channel_tt_user_talkplus_TALKPLUS_ID_fk",
        using: "BTREE",
        fields: [
          { name: "SELLER_ID" },
        ]
      },
    ]
  });
  }
}
