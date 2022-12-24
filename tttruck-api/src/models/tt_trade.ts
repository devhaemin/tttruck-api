import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_trade_review, tt_trade_reviewId } from './tt_trade_review';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_tradeAttributes {
  PRODUCT_ID: number;
  TRADE_TIME?: Date;
  TRADE_STATUS: number;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: string;
  SELLER_USER_IPv6?: any;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: number;
}

export type tt_tradePk = "PRODUCT_ID";
export type tt_tradeId = tt_trade[tt_tradePk];
export type tt_tradeOptionalAttributes = "TRADE_TIME" | "TRADE_STATUS" | "SELLER_USER_ID" | "SELLER_USER_IPv4" | "SELLER_USER_IPv6" | "BUYER_USER_ID" | "BUYER_USER_IPv4" | "BUYER_USER_IPv6" | "DELETE_TF";
export type tt_tradeCreationAttributes = Optional<tt_tradeAttributes, tt_tradeOptionalAttributes>;

export class tt_trade extends Model<tt_tradeAttributes, tt_tradeCreationAttributes> implements tt_tradeAttributes {
  PRODUCT_ID!: number;
  TRADE_TIME?: Date;
  TRADE_STATUS!: number;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: string;
  SELLER_USER_IPv6?: any;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: number;

  // tt_trade belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_trade hasMany tt_trade_review via PRODUCT_ID
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
  // tt_trade belongsTo tt_user via SELLER_USER_ID
  SELLER_USER!: tt_user;
  getSELLER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSELLER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSELLER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_trade belongsTo tt_user via BUYER_USER_ID
  BUYER_USER!: tt_user;
  getBUYER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setBUYER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createBUYER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trade {
    return tt_trade.init({
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "거래 상품 ID",
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    TRADE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "거래일"
    },
    TRADE_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0:판매중,1:채팅중,9:거래완료"
    },
    SELLER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "판매자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    SELLER_USER_IPv4: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "판매자 IPv4"
    },
    SELLER_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "판매자 IPv6"
    },
    BUYER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "구매자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    BUYER_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "구매자 IPv4"
    },
    BUYER_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "구매자 IPv6"
    },
    DELETE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "삭제 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_trade',
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
        name: "FK_tt_product_trade_log_BUYER_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "BUYER_USER_ID" },
        ]
      },
      {
        name: "FK_tt_product_trade_log_PRODUCT_ID_tt_product_PRODUCT_ID",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "FK_tt_product_trade_log_SELLER_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "SELLER_USER_ID" },
        ]
      },
    ]
  });
  }
}
