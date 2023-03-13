import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_badge, tt_badgeId } from './tt_badge';

export interface tt_badge_conditionAttributes {
  CONDITION_ID: number;
  PRODUCT_CATEGORY_ID?: number;
  BADGE_ID?: number;
  WEIGHT?: number;
  CONDITION_REG_DATE?: Date;
}

export type tt_badge_conditionPk = "CONDITION_ID";
export type tt_badge_conditionId = tt_badge_condition[tt_badge_conditionPk];
export type tt_badge_conditionOptionalAttributes = "CONDITION_ID" | "PRODUCT_CATEGORY_ID" | "BADGE_ID" | "WEIGHT" | "CONDITION_REG_DATE";
export type tt_badge_conditionCreationAttributes = Optional<tt_badge_conditionAttributes, tt_badge_conditionOptionalAttributes>;

export class tt_badge_condition extends Model<tt_badge_conditionAttributes, tt_badge_conditionCreationAttributes> implements tt_badge_conditionAttributes {
  CONDITION_ID!: number;
  PRODUCT_CATEGORY_ID?: number;
  BADGE_ID?: number;
  WEIGHT?: number;
  CONDITION_REG_DATE?: Date;

  // tt_badge_condition belongsTo tt_badge via BADGE_ID
  BADGE!: tt_badge;
  getBADGE!: Sequelize.BelongsToGetAssociationMixin<tt_badge>;
  setBADGE!: Sequelize.BelongsToSetAssociationMixin<tt_badge, tt_badgeId>;
  createBADGE!: Sequelize.BelongsToCreateAssociationMixin<tt_badge>;
  // tt_badge_condition belongsTo tt_badge_condition via PRODUCT_CATEGORY_ID
  PRODUCT_CATEGORY!: tt_badge_condition;
  getPRODUCT_CATEGORY!: Sequelize.BelongsToGetAssociationMixin<tt_badge_condition>;
  setPRODUCT_CATEGORY!: Sequelize.BelongsToSetAssociationMixin<tt_badge_condition, tt_badge_conditionId>;
  createPRODUCT_CATEGORY!: Sequelize.BelongsToCreateAssociationMixin<tt_badge_condition>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_badge_condition {
    return tt_badge_condition.init({
    CONDITION_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    PRODUCT_CATEGORY_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_badge_condition',
        key: 'CONDITION_ID'
      }
    },
    BADGE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_badge',
        key: 'BADGE_ID'
      }
    },
    WEIGHT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CONDITION_REG_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_badge_condition',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CONDITION_ID" },
        ]
      },
      {
        name: "FK_tt_badge_condition_CATEGORYID_tt_product_category_CATEGORYID",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_CATEGORY_ID" },
        ]
      },
      {
        name: "FK_tt_badge_condition_BADGE_ID_tt_badge_BADGE_ID",
        using: "BTREE",
        fields: [
          { name: "BADGE_ID" },
        ]
      },
    ]
  });
  }
}
