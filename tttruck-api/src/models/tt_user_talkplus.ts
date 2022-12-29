import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_user_talkplusAttributes {
  USER_ID: number;
  TALKPLUS_ID?: string;
  TALKPLUS_PASSWORD?: string;
  TALKPLUS_USERNAME?: string;
  TALKPLUS_PROFILE_IMAGE_URL?: string;
  TALKPLUS_LOGIN_TOKEN?: string;
}

export type tt_user_talkplusPk = "USER_ID";
export type tt_user_talkplusId = tt_user_talkplus[tt_user_talkplusPk];
export type tt_user_talkplusOptionalAttributes = "TALKPLUS_ID" | "TALKPLUS_PASSWORD" | "TALKPLUS_USERNAME" | "TALKPLUS_PROFILE_IMAGE_URL" | "TALKPLUS_LOGIN_TOKEN";
export type tt_user_talkplusCreationAttributes = Optional<tt_user_talkplusAttributes, tt_user_talkplusOptionalAttributes>;

export class tt_user_talkplus extends Model<tt_user_talkplusAttributes, tt_user_talkplusCreationAttributes> implements tt_user_talkplusAttributes {
  USER_ID!: number;
  TALKPLUS_ID?: string;
  TALKPLUS_PASSWORD?: string;
  TALKPLUS_USERNAME?: string;
  TALKPLUS_PROFILE_IMAGE_URL?: string;
  TALKPLUS_LOGIN_TOKEN?: string;

  // tt_user_talkplus belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_user_talkplus {
    return tt_user_talkplus.init({
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    TALKPLUS_ID: {
      type: DataTypes.STRING(100),
      allowNull: true
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
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
