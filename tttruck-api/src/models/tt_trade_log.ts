import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_trade_logAttributes {
  TRADE_ID: number;
  PRODUCT_ID?: number;
  SELLER_USER_ID: number;
  BUYER_USER_ID: number;
  PRODUCT_PRICE?: number;
  PRODUCT_WEIGHT: number;
  PRODUCT_SIZE?: string;
  QUANTITY?: string;
  TRADE_TIME: Date;
}

export type tt_trade_logPk = "TRADE_ID";
export type tt_trade_logId = tt_trade_log[tt_trade_logPk];
export type tt_trade_logOptionalAttributes = "TRADE_ID" | "PRODUCT_ID" | "PRODUCT_PRICE" | "PRODUCT_SIZE" | "QUANTITY" | "TRADE_TIME";
export type tt_trade_logCreationAttributes = Optional<tt_trade_logAttributes, tt_trade_logOptionalAttributes>;

export class tt_trade_log extends Model<tt_trade_logAttributes, tt_trade_logCreationAttributes> implements tt_trade_logAttributes {
  TRADE_ID!: number;
  PRODUCT_ID?: number;
  SELLER_USER_ID!: number;
  BUYER_USER_ID!: number;
  PRODUCT_PRICE?: number;
  PRODUCT_WEIGHT!: number;
  PRODUCT_SIZE?: string;
  QUANTITY?: string;
  TRADE_TIME!: Date;

  // tt_trade_log belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_trade_log belongsTo tt_user via SELLER_USER_ID
  SELLER_USER!: tt_user;
  getSELLER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSELLER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSELLER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_trade_log belongsTo tt_user via BUYER_USER_ID
  BUYER_USER!: tt_user;
  getBUYER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setBUYER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createBUYER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trade_log {
    return tt_trade_log.init({
    TRADE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    SELLER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    BUYER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    PRODUCT_PRICE: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    PRODUCT_WEIGHT: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    PRODUCT_SIZE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    QUANTITY: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    TRADE_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_trade_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TRADE_ID" },
        ]
      },
      {
        name: "tt_trade_log_tt_product_id_fk",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "tt_trade_log_tt_user_buyer_user_fk",
        using: "BTREE",
        fields: [
          { name: "BUYER_USER_ID" },
        ]
      },
      {
        name: "tt_trade_log_tt_user_seller_user_fk",
        using: "BTREE",
        fields: [
          { name: "SELLER_USER_ID" },
        ]
      },
    ]
  });
  }
}
