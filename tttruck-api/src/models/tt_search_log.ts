import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_search_logAttributes {
  SEARCH_LOG_ID: number;
  USER_ID?: number;
  SEARCH_TIME: Date;
  SEARCH_STR: string;
  IPv4?: number;
  IPv6?: any;
}

export type tt_search_logPk = "SEARCH_LOG_ID";
export type tt_search_logId = tt_search_log[tt_search_logPk];
export type tt_search_logOptionalAttributes = "SEARCH_LOG_ID" | "USER_ID" | "SEARCH_TIME" | "SEARCH_STR" | "IPv4" | "IPv6";
export type tt_search_logCreationAttributes = Optional<tt_search_logAttributes, tt_search_logOptionalAttributes>;

export class tt_search_log extends Model<tt_search_logAttributes, tt_search_logCreationAttributes> implements tt_search_logAttributes {
  SEARCH_LOG_ID!: number;
  USER_ID?: number;
  SEARCH_TIME!: Date;
  SEARCH_STR!: string;
  IPv4?: number;
  IPv6?: any;

  // tt_search_log belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_search_log {
    return tt_search_log.init({
    SEARCH_LOG_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    SEARCH_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    SEARCH_STR: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "0"
    },
    IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    IPv6: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tt_search_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "SEARCH_LOG_ID" },
        ]
      },
      {
        name: "tt_search_log_tt_user_null_fk",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
    ]
  });
  }
}
