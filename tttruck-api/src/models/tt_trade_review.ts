import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_trade, tt_tradeId } from './tt_trade';

export interface tt_trade_reviewAttributes {
  TRADE_REVIEW_ID: number;
  PRODUCT_ID?: number;
  TRADE_REVIEW_TYPE?: number;
  USER_ID?: number;
  RATINGS: number;
  SUBJECT?: number;
  CONTENTS?: string;
  IPv4?: number;
  IPv6?: any;
  CREATE_TIME?: Date;
  UPDATE_TIME?: Date;
  DELETE_TF?: number;
}

export type tt_trade_reviewPk = "TRADE_REVIEW_ID";
export type tt_trade_reviewId = tt_trade_review[tt_trade_reviewPk];
export type tt_trade_reviewOptionalAttributes = "TRADE_REVIEW_ID" | "PRODUCT_ID" | "TRADE_REVIEW_TYPE" | "USER_ID" | "RATINGS" | "SUBJECT" | "CONTENTS" | "IPv4" | "IPv6" | "CREATE_TIME" | "UPDATE_TIME" | "DELETE_TF";
export type tt_trade_reviewCreationAttributes = Optional<tt_trade_reviewAttributes, tt_trade_reviewOptionalAttributes>;

export class tt_trade_review extends Model<tt_trade_reviewAttributes, tt_trade_reviewCreationAttributes> implements tt_trade_reviewAttributes {
  TRADE_REVIEW_ID!: number;
  PRODUCT_ID?: number;
  TRADE_REVIEW_TYPE?: number;
  USER_ID?: number;
  RATINGS!: number;
  SUBJECT?: number;
  CONTENTS?: string;
  IPv4?: number;
  IPv6?: any;
  CREATE_TIME?: Date;
  UPDATE_TIME?: Date;
  DELETE_TF?: number;

  // tt_trade_review belongsTo tt_trade via PRODUCT_ID
  PRODUCT!: tt_trade;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_trade>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_trade, tt_tradeId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_trade>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trade_review {
    return tt_trade_review.init({
    TRADE_REVIEW_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_trade',
        key: 'PRODUCT_ID'
      }
    },
    TRADE_REVIEW_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    RATINGS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    SUBJECT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IPv6: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    CREATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    DELETE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tt_trade_review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TRADE_REVIEW_ID" },
        ]
      },
      {
        name: "tt_trade_review_tt_trade_null_fk",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
    ]
  });
  }
}
