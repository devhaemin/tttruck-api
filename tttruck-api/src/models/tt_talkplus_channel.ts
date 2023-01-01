import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_user_talkplus, tt_user_talkplusId } from './tt_user_talkplus';

export interface tt_talkplus_channelAttributes {
  CHANNEL_ID: number;
  TALKPLUS_CHANNEL_ID: string;
  PRODUCT_ID?: number;
  NAME?: string;
  OWNER_ID: string;
  TYPE?: string;
  IMAGE_URL?: string;
  MAX_MEMBER_COUNT: number;
  STATUS: number;
  SELLER_ID?: string;
}

export type tt_talkplus_channelPk = "CHANNEL_ID";
export type tt_talkplus_channelId = tt_talkplus_channel[tt_talkplus_channelPk];
export type tt_talkplus_channelOptionalAttributes = "CHANNEL_ID" | "PRODUCT_ID" | "NAME" | "TYPE" | "IMAGE_URL" | "MAX_MEMBER_COUNT" | "STATUS" | "SELLER_ID";
export type tt_talkplus_channelCreationAttributes = Optional<tt_talkplus_channelAttributes, tt_talkplus_channelOptionalAttributes>;

export class tt_talkplus_channel extends Model<tt_talkplus_channelAttributes, tt_talkplus_channelCreationAttributes> implements tt_talkplus_channelAttributes {
  CHANNEL_ID!: number;
  TALKPLUS_CHANNEL_ID!: string;
  PRODUCT_ID?: number;
  NAME?: string;
  OWNER_ID!: string;
  TYPE?: string;
  IMAGE_URL?: string;
  MAX_MEMBER_COUNT!: number;
  STATUS!: number;
  SELLER_ID?: string;

  // tt_talkplus_channel belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_talkplus_channel belongsTo tt_user_talkplus via OWNER_ID
  OWNER!: tt_user_talkplus;
  getOWNER!: Sequelize.BelongsToGetAssociationMixin<tt_user_talkplus>;
  setOWNER!: Sequelize.BelongsToSetAssociationMixin<tt_user_talkplus, tt_user_talkplusId>;
  createOWNER!: Sequelize.BelongsToCreateAssociationMixin<tt_user_talkplus>;
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
      allowNull: false
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    NAME: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    OWNER_ID: {
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
    }
  }, {
    sequelize,
    tableName: 'tt_talkplus_channel',
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
        name: "tt_talkplus_channel_tt_user_talkplus_null_fk",
        using: "BTREE",
        fields: [
          { name: "OWNER_ID" },
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
