import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_bannerAttributes {
  BANNER_ID: number;
  BANNER_NAME: string;
  BANNER_CONTENTS: string;
  BANNER_URL?: string;
  BANNER_TYPE: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  DISPLAY_TF: number;
  DELAY_TIME: number;
  TOP_FIX_TF: number;
  UPDATE_USER_ID: number;
  UPDATE_TIME: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  POST_USER_ID?: number;
  POST_TIME: Date;
  POST_IPv4?: number;
  POST_IPv6?: any;
}

export type tt_bannerPk = "BANNER_ID";
export type tt_bannerId = tt_banner[tt_bannerPk];
export type tt_bannerOptionalAttributes = "BANNER_ID" | "BANNER_URL" | "BANNER_TYPE" | "FILE_NAME" | "FILE_PATH" | "DISPLAY_TF" | "DELAY_TIME" | "TOP_FIX_TF" | "UPDATE_TIME" | "UPDATE_IPv4" | "UPDATE_IPv6" | "POST_USER_ID" | "POST_TIME" | "POST_IPv4" | "POST_IPv6";
export type tt_bannerCreationAttributes = Optional<tt_bannerAttributes, tt_bannerOptionalAttributes>;

export class tt_banner extends Model<tt_bannerAttributes, tt_bannerCreationAttributes> implements tt_bannerAttributes {
  BANNER_ID!: number;
  BANNER_NAME!: string;
  BANNER_CONTENTS!: string;
  BANNER_URL?: string;
  BANNER_TYPE!: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  DISPLAY_TF!: number;
  DELAY_TIME!: number;
  TOP_FIX_TF!: number;
  UPDATE_USER_ID!: number;
  UPDATE_TIME!: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  POST_USER_ID?: number;
  POST_TIME!: Date;
  POST_IPv4?: number;
  POST_IPv6?: any;

  // tt_banner belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_banner belongsTo tt_user via POST_USER_ID
  POST_USER!: tt_user;
  getPOST_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setPOST_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createPOST_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_banner {
    return tt_banner.init({
    BANNER_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    BANNER_NAME: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    BANNER_CONTENTS: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    BANNER_URL: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    BANNER_TYPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Type ( 0: main, 1 : footer, ... )"
    },
    FILE_NAME: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    FILE_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    DISPLAY_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    DELAY_TIME: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    TOP_FIX_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    UPDATE_IPv4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UPDATE_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    POST_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    POST_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    POST_IPv4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    POST_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tt_banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BANNER_ID" },
        ]
      },
      {
        name: "tt_banner_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
      {
        name: "tt_banner_post_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "POST_USER_ID" },
        ]
      },
    ]
  });
  }
}
