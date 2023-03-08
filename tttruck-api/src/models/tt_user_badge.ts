import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_badge, tt_badgeId } from './tt_badge';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_user_badgeAttributes {
  ID: number;
  USER_ID: number;
  BADGE_ID: number;
  REG_DATE: Date;
  OP1?: number;
  OP2?: number;
  IS_ACTIVATED?: number;
}

export type tt_user_badgePk = "ID";
export type tt_user_badgeId = tt_user_badge[tt_user_badgePk];
export type tt_user_badgeOptionalAttributes = "ID" | "REG_DATE" | "OP1" | "OP2" | "IS_ACTIVATED";
export type tt_user_badgeCreationAttributes = Optional<tt_user_badgeAttributes, tt_user_badgeOptionalAttributes>;

export class tt_user_badge extends Model<tt_user_badgeAttributes, tt_user_badgeCreationAttributes> implements tt_user_badgeAttributes {
  ID!: number;
  USER_ID!: number;
  BADGE_ID!: number;
  REG_DATE!: Date;
  OP1?: number;
  OP2?: number;
  IS_ACTIVATED?: number;

  // tt_user_badge belongsTo tt_badge via BADGE_ID
  BADGE!: tt_badge;
  getBADGE!: Sequelize.BelongsToGetAssociationMixin<tt_badge>;
  setBADGE!: Sequelize.BelongsToSetAssociationMixin<tt_badge, tt_badgeId>;
  createBADGE!: Sequelize.BelongsToCreateAssociationMixin<tt_badge>;
  // tt_user_badge belongsTo tt_user via USER_ID
  USER!: tt_user;
  getUSER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUSER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUSER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_user_badge {
    return tt_user_badge.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "뱃지ID"
    },
    USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "USER FK",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    BADGE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "BADGE FK",
      references: {
        model: 'tt_badge',
        key: 'BADGE_ID'
      }
    },
    REG_DATE: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "출시일"
    },
    OP1: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "조건1 충족여부"
    },
    OP2: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "조건2 충족여부"
    },
    IS_ACTIVATED: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "활성화 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_user_badge',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "FK_tt_user_badge_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "FK_tt_user_badge_BADGE_ID_tt_badge_BADGE_ID",
        using: "BTREE",
        fields: [
          { name: "BADGE_ID" },
        ]
      },
    ]
  });
  }
}
