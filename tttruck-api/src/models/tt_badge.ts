import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_badge_condition, tt_badge_conditionId } from './tt_badge_condition';
import type { tt_user_badge, tt_user_badgeId } from './tt_user_badge';

export interface tt_badgeAttributes {
  BADGE_ID: number;
  BADGE_SUBJECT?: string;
  BADGE_CONTENT?: string;
  BADGE_FILE_URL?: string;
  BADGE_REG_DATE?: Date;
  BADGE_OP1_CONTENT?: string;
  BADGE_OP2_CONTENT?: string;
}

export type tt_badgePk = "BADGE_ID";
export type tt_badgeId = tt_badge[tt_badgePk];
export type tt_badgeOptionalAttributes = "BADGE_ID" | "BADGE_SUBJECT" | "BADGE_CONTENT" | "BADGE_FILE_URL" | "BADGE_REG_DATE" | "BADGE_OP1_CONTENT" | "BADGE_OP2_CONTENT";
export type tt_badgeCreationAttributes = Optional<tt_badgeAttributes, tt_badgeOptionalAttributes>;

export class tt_badge extends Model<tt_badgeAttributes, tt_badgeCreationAttributes> implements tt_badgeAttributes {
  BADGE_ID!: number;
  BADGE_SUBJECT?: string;
  BADGE_CONTENT?: string;
  BADGE_FILE_URL?: string;
  BADGE_REG_DATE?: Date;
  BADGE_OP1_CONTENT?: string;
  BADGE_OP2_CONTENT?: string;

  // tt_badge hasMany tt_badge_condition via BADGE_ID
  tt_badge_conditions!: tt_badge_condition[];
  getTt_badge_conditions!: Sequelize.HasManyGetAssociationsMixin<tt_badge_condition>;
  setTt_badge_conditions!: Sequelize.HasManySetAssociationsMixin<tt_badge_condition, tt_badge_conditionId>;
  addTt_badge_condition!: Sequelize.HasManyAddAssociationMixin<tt_badge_condition, tt_badge_conditionId>;
  addTt_badge_conditions!: Sequelize.HasManyAddAssociationsMixin<tt_badge_condition, tt_badge_conditionId>;
  createTt_badge_condition!: Sequelize.HasManyCreateAssociationMixin<tt_badge_condition>;
  removeTt_badge_condition!: Sequelize.HasManyRemoveAssociationMixin<tt_badge_condition, tt_badge_conditionId>;
  removeTt_badge_conditions!: Sequelize.HasManyRemoveAssociationsMixin<tt_badge_condition, tt_badge_conditionId>;
  hasTt_badge_condition!: Sequelize.HasManyHasAssociationMixin<tt_badge_condition, tt_badge_conditionId>;
  hasTt_badge_conditions!: Sequelize.HasManyHasAssociationsMixin<tt_badge_condition, tt_badge_conditionId>;
  countTt_badge_conditions!: Sequelize.HasManyCountAssociationsMixin;
  // tt_badge hasMany tt_user_badge via BADGE_ID
  tt_user_badges!: tt_user_badge[];
  getTt_user_badges!: Sequelize.HasManyGetAssociationsMixin<tt_user_badge>;
  setTt_user_badges!: Sequelize.HasManySetAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  addTt_user_badge!: Sequelize.HasManyAddAssociationMixin<tt_user_badge, tt_user_badgeId>;
  addTt_user_badges!: Sequelize.HasManyAddAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  createTt_user_badge!: Sequelize.HasManyCreateAssociationMixin<tt_user_badge>;
  removeTt_user_badge!: Sequelize.HasManyRemoveAssociationMixin<tt_user_badge, tt_user_badgeId>;
  removeTt_user_badges!: Sequelize.HasManyRemoveAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  hasTt_user_badge!: Sequelize.HasManyHasAssociationMixin<tt_user_badge, tt_user_badgeId>;
  hasTt_user_badges!: Sequelize.HasManyHasAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  countTt_user_badges!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_badge {
    return tt_badge.init({
    BADGE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "뱃지_일련번호"
    },
    BADGE_SUBJECT: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: "뱃지_제목"
    },
    BADGE_CONTENT: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "뱃지_내용"
    },
    BADGE_FILE_URL: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "뱃지_이미지_URL"
    },
    BADGE_REG_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "뱃지_출시일"
    },
    BADGE_OP1_CONTENT: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "뱃지_조건1"
    },
    BADGE_OP2_CONTENT: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "뱃지_조건2"
    }
  }, {
    sequelize,
    tableName: 'tt_badge',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BADGE_ID" },
        ]
      },
    ]
  });
  }
}
