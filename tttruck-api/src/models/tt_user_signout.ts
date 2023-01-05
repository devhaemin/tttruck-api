import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_user_signoutAttributes {
  SIGNOUT_ID: number;
  USER_ID: number;
  TEXT?: string;
  TIME: Date;
}

export type tt_user_signoutPk = "SIGNOUT_ID";
export type tt_user_signoutId = tt_user_signout[tt_user_signoutPk];
export type tt_user_signoutOptionalAttributes = "SIGNOUT_ID" | "TEXT" | "TIME";
export type tt_user_signoutCreationAttributes = Optional<tt_user_signoutAttributes, tt_user_signoutOptionalAttributes>;

export class tt_user_signout extends Model<tt_user_signoutAttributes, tt_user_signoutCreationAttributes> implements tt_user_signoutAttributes {
  SIGNOUT_ID!: number;
  USER_ID!: number;
  TEXT?: string;
  TIME!: Date;

  // tt_user_signout belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_user_signout {
    return tt_user_signout.init({
    SIGNOUT_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    TEXT: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_user_signout',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SIGNOUT_ID" },
        ]
      },
      {
        name: "tt_user_signout_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
