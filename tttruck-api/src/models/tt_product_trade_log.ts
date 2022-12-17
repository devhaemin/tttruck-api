import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_product_trade_logAttributes {
  PRODUCT_TRADE_LOG: number;
  PRODUCT_ID?: number;
  PRODUCT_PRICE?: number;
  PRODUCT_SIZE?: number;
  PRODUCT_WEIGHT?: number;
  TRADE_SUCCESS_TF?: string;
  TRADE_FAILURE_MSG?: string;
  TRADE_DATE?: Date;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: string;
  SELLER_USER_IPv6?: any;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: string;
}

export type tt_product_trade_logPk = "PRODUCT_TRADE_LOG";
export type tt_product_trade_logId = tt_product_trade_log[tt_product_trade_logPk];
export type tt_product_trade_logOptionalAttributes = "PRODUCT_TRADE_LOG" | "PRODUCT_ID" | "PRODUCT_PRICE" | "PRODUCT_SIZE" | "PRODUCT_WEIGHT" | "TRADE_SUCCESS_TF" | "TRADE_FAILURE_MSG" | "TRADE_DATE" | "SELLER_USER_ID" | "SELLER_USER_IPv4" | "SELLER_USER_IPv6" | "BUYER_USER_ID" | "BUYER_USER_IPv4" | "BUYER_USER_IPv6" | "DELETE_TF";
export type tt_product_trade_logCreationAttributes = Optional<tt_product_trade_logAttributes, tt_product_trade_logOptionalAttributes>;

export class tt_product_trade_log extends Model<tt_product_trade_logAttributes, tt_product_trade_logCreationAttributes> implements tt_product_trade_logAttributes {
  PRODUCT_TRADE_LOG!: number;
  PRODUCT_ID?: number;
  PRODUCT_PRICE?: number;
  PRODUCT_SIZE?: number;
  PRODUCT_WEIGHT?: number;
  TRADE_SUCCESS_TF?: string;
  TRADE_FAILURE_MSG?: string;
  TRADE_DATE?: Date;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: string;
  SELLER_USER_IPv6?: any;
  BUYER_USER_ID?: number;
  BUYER_USER_IPv4?: number;
  BUYER_USER_IPv6?: any;
  DELETE_TF?: string;

  // tt_product_trade_log belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_product_trade_log belongsTo tt_user via SELLER_USER_ID
  SELLER_USER!: tt_user;
  getSELLER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSELLER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSELLER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_product_trade_log belongsTo tt_user via BUYER_USER_ID
  BUYER_USER!: tt_user;
  getBUYER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setBUYER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createBUYER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product_trade_log {
    return tt_product_trade_log.init({
    PRODUCT_TRADE_LOG: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "거래 로그 ID"
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "거래 상품 ID",
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    PRODUCT_PRICE: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "거래 금액"
    },
    PRODUCT_SIZE: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "상품 규격"
    },
    PRODUCT_WEIGHT: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "상품 무게"
    },
    TRADE_SUCCESS_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "T",
      comment: "거래상태 ( 0: 거래 실패, 1 : 거래 성공, 2 : 거래 취소)"
    },
    TRADE_FAILURE_MSG: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "거래 실패 사유"
    },
    TRADE_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "거래일"
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
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "F",
      comment: "삭제 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_product_trade_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_TRADE_LOG" },
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
      {
        name: "FK_tt_product_trade_log_BUYER_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "BUYER_USER_ID" },
        ]
      },
    ]
  });
  }
}
