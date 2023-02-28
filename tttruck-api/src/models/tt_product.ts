import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product_category, tt_product_categoryId } from './tt_product_category';
import type { tt_product_image, tt_product_imageId } from './tt_product_image';
import type { tt_talkplus_channel, tt_talkplus_channelId } from './tt_talkplus_channel';
import type { tt_trade_log, tt_trade_logId } from './tt_trade_log';
import type { tt_trade_review, tt_trade_reviewId } from './tt_trade_review';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_productAttributes {
  PRODUCT_ID: number;
  SUBJECT: string;
  PRIORITY: number;
  PRODUCT_CATEGORY_ID: number;
  PRODUCT_PRICE: number;
  PRODUCT_SIZE: string;
  PRODUCT_WEIGHT: number;
  CONTENTS: string;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: number;
  SELLER_USER_IPv6?: any;
  UPLOAD_TIME?: Date;
  TAG?: string;
  ADDRESS?: string;
  LATITUDE: string;
  LONGITUDE: string;
  LOCATION: any;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_DATE?: Date;
  TRADE_STATUS?: number;
  TRADE_TIME?: Date;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: number;
  QUANTITY?: string;
  CHAT_TF: number;
}

export type tt_productPk = "PRODUCT_ID";
export type tt_productId = tt_product[tt_productPk];
export type tt_productOptionalAttributes = "PRODUCT_ID" | "PRIORITY" | "SELLER_USER_ID" | "SELLER_USER_IPv4" | "SELLER_USER_IPv6" | "UPLOAD_TIME" | "TAG" | "ADDRESS" | "LATITUDE" | "LONGITUDE" | "LOCATION" | "UPDATE_USER_ID" | "UPDATE_USER_IPv4" | "UPDATE_USER_IPv6" | "UPDATE_DATE" | "TRADE_STATUS" | "TRADE_TIME" | "BUYER_USER_ID" | "BUYER_USER_IPv4" | "BUYER_USER_IPv6" | "DELETE_TF" | "QUANTITY" | "CHAT_TF";
export type tt_productCreationAttributes = Optional<tt_productAttributes, tt_productOptionalAttributes>;

export class tt_product extends Model<tt_productAttributes, tt_productCreationAttributes> implements tt_productAttributes {
  PRODUCT_ID!: number;
  SUBJECT!: string;
  PRIORITY!: number;
  PRODUCT_CATEGORY_ID!: number;
  PRODUCT_PRICE!: number;
  PRODUCT_SIZE!: string;
  PRODUCT_WEIGHT!: number;
  CONTENTS!: string;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: number;
  SELLER_USER_IPv6?: any;
  UPLOAD_TIME?: Date;
  TAG?: string;
  ADDRESS?: string;
  LATITUDE!: string;
  LONGITUDE!: string;
  LOCATION!: any;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_DATE?: Date;
  TRADE_STATUS?: number;
  TRADE_TIME?: Date;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: number;
  QUANTITY?: string;
  CHAT_TF!: number;

  // tt_product hasMany tt_product_image via PRODUCT_ID
  tt_product_images!: tt_product_image[];
  getTt_product_images!: Sequelize.HasManyGetAssociationsMixin<tt_product_image>;
  setTt_product_images!: Sequelize.HasManySetAssociationsMixin<tt_product_image, tt_product_imageId>;
  addTt_product_image!: Sequelize.HasManyAddAssociationMixin<tt_product_image, tt_product_imageId>;
  addTt_product_images!: Sequelize.HasManyAddAssociationsMixin<tt_product_image, tt_product_imageId>;
  createTt_product_image!: Sequelize.HasManyCreateAssociationMixin<tt_product_image>;
  removeTt_product_image!: Sequelize.HasManyRemoveAssociationMixin<tt_product_image, tt_product_imageId>;
  removeTt_product_images!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_image, tt_product_imageId>;
  hasTt_product_image!: Sequelize.HasManyHasAssociationMixin<tt_product_image, tt_product_imageId>;
  hasTt_product_images!: Sequelize.HasManyHasAssociationsMixin<tt_product_image, tt_product_imageId>;
  countTt_product_images!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product hasMany tt_talkplus_channel via PRODUCT_ID
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
  // tt_product hasMany tt_trade_log via PRODUCT_ID
  tt_trade_logs!: tt_trade_log[];
  getTt_trade_logs!: Sequelize.HasManyGetAssociationsMixin<tt_trade_log>;
  setTt_trade_logs!: Sequelize.HasManySetAssociationsMixin<tt_trade_log, tt_trade_logId>;
  addTt_trade_log!: Sequelize.HasManyAddAssociationMixin<tt_trade_log, tt_trade_logId>;
  addTt_trade_logs!: Sequelize.HasManyAddAssociationsMixin<tt_trade_log, tt_trade_logId>;
  createTt_trade_log!: Sequelize.HasManyCreateAssociationMixin<tt_trade_log>;
  removeTt_trade_log!: Sequelize.HasManyRemoveAssociationMixin<tt_trade_log, tt_trade_logId>;
  removeTt_trade_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_trade_log, tt_trade_logId>;
  hasTt_trade_log!: Sequelize.HasManyHasAssociationMixin<tt_trade_log, tt_trade_logId>;
  hasTt_trade_logs!: Sequelize.HasManyHasAssociationsMixin<tt_trade_log, tt_trade_logId>;
  countTt_trade_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product hasMany tt_trade_review via PRODUCT_ID
  tt_trade_reviews!: tt_trade_review[];
  getTt_trade_reviews!: Sequelize.HasManyGetAssociationsMixin<tt_trade_review>;
  setTt_trade_reviews!: Sequelize.HasManySetAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  addTt_trade_review!: Sequelize.HasManyAddAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  addTt_trade_reviews!: Sequelize.HasManyAddAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  createTt_trade_review!: Sequelize.HasManyCreateAssociationMixin<tt_trade_review>;
  removeTt_trade_review!: Sequelize.HasManyRemoveAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  removeTt_trade_reviews!: Sequelize.HasManyRemoveAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  hasTt_trade_review!: Sequelize.HasManyHasAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  hasTt_trade_reviews!: Sequelize.HasManyHasAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  countTt_trade_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product belongsTo tt_product_category via PRODUCT_CATEGORY_ID
  PRODUCT_CATEGORY!: tt_product_category;
  getPRODUCT_CATEGORY!: Sequelize.BelongsToGetAssociationMixin<tt_product_category>;
  setPRODUCT_CATEGORY!: Sequelize.BelongsToSetAssociationMixin<tt_product_category, tt_product_categoryId>;
  createPRODUCT_CATEGORY!: Sequelize.BelongsToCreateAssociationMixin<tt_product_category>;
  // tt_product belongsTo tt_user via SELLER_USER_ID
  SELLER_USER!: tt_user;
  getSELLER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSELLER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSELLER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_product belongsTo tt_user via BUYER_USER_ID
  BUYER_USER!: tt_user;
  getBUYER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setBUYER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createBUYER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product {
    return tt_product.init({
    PRODUCT_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "상품 ID"
    },
    SUBJECT: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "제목"
    },
    PRIORITY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 999,
      comment: "정렬 우선순위"
    },
    PRODUCT_CATEGORY_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "상품 카테고리",
      references: {
        model: 'tt_product_category',
        key: 'PRODUCT_CATEGORY_ID'
      }
    },
    PRODUCT_PRICE: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "가격"
    },
    PRODUCT_SIZE: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "규격 ( 분위별 규격 )"
    },
    PRODUCT_WEIGHT: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "상품 무게"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    SELLER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "판매 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    SELLER_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "판매자 IPv4"
    },
    SELLER_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "판매자 IPv6"
    },
    UPLOAD_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "판매 업로드일"
    },
    TAG: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: "태그"
    },
    ADDRESS: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "장소"
    },
    LATITUDE: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "37.541"
    },
    LONGITUDE: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "126.986"
    },
    LOCATION: {
      type: DataTypes.GEOMETRY,
      allowNull: false,
      defaultValue: "point(37.541,126.986)"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 ID"
    },
    UPDATE_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 IPv4"
    },
    UPDATE_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "수정 사용자 IPv6"
    },
    UPDATE_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일"
    },
    TRADE_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    TRADE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    BUYER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    BUYER_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    BUYER_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    DELETE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    QUANTITY: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    CHAT_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tt_product',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "tt_product_tt_product_category_null_fk",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_CATEGORY_ID" },
        ]
      },
      {
        name: "tt_product_tt_user_USER_ID_fk",
        using: "BTREE",
        fields: [
          { name: "BUYER_USER_ID" },
        ]
      },
      {
        name: "tt_product_SELLER_ID_tt_user_USER_ID_fk",
        using: "BTREE",
        fields: [
          { name: "SELLER_USER_ID" },
        ]
      },
    ]
  });
  }
}
