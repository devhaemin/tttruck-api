import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_badge, tt_badgeId } from './tt_badge';

export interface tt_badge_conditionAttributes {
  ID: number;
  BADGE_ID?: number;
  PRODUCT_CATEGORY_ID?: number;
  PRODUCT_CATEGORY_NAME?: string;
}

export type tt_badge_conditionPk = "ID";
export type tt_badge_conditionId = tt_badge_condition[tt_badge_conditionPk];
export type tt_badge_conditionOptionalAttributes = "ID" | "BADGE_ID" | "PRODUCT_CATEGORY_ID" | "PRODUCT_CATEGORY_NAME";
export type tt_badge_conditionCreationAttributes = Optional<tt_badge_conditionAttributes, tt_badge_conditionOptionalAttributes>;

export class tt_badge_condition extends Model<tt_badge_conditionAttributes, tt_badge_conditionCreationAttributes> implements tt_badge_conditionAttributes {
  ID!: number;
  BADGE_ID?: number;
  PRODUCT_CATEGORY_ID?: number;
  PRODUCT_CATEGORY_NAME?: string;

  // tt_badge_condition belongsTo tt_badge via BADGE_ID
  BADGE!: tt_badge;
  getBADGE!: Sequelize.BelongsToGetAssociationMixin<tt_badge>;
  setBADGE!: Sequelize.BelongsToSetAssociationMixin<tt_badge, tt_badgeId>;
  createBADGE!: Sequelize.BelongsToCreateAssociationMixin<tt_badge>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_badge_condition {
    return tt_badge_condition.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    BADGE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'tt_badge',
        key: 'BADGE_ID'
      }
    },
    PRODUCT_CATEGORY_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    PRODUCT_CATEGORY_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
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
          { name: "ID" },
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
