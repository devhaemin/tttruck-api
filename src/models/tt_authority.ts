import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_api_list, tt_api_listId } from './tt_api_list';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_authorityAttributes {
  AUTHORITY_ID: number;
  AUTHORITY_NAME: string;
  DEFAULT_TF: string;
  DESCRIPTION?: string;
  USE_TF: string;
  REG_USER_ID?: number;
  REG_DATE?: Date;
  REG_IP?: string;
  UPD_USER_ID?: number;
  UPD_DATE?: Date;
  UPD_IP?: string;
  AUTHORITY_LEVEL?: number;
}

export type tt_authorityPk = "AUTHORITY_ID";
export type tt_authorityId = tt_authority[tt_authorityPk];
export type tt_authorityOptionalAttributes = "DEFAULT_TF" | "DESCRIPTION" | "USE_TF" | "REG_USER_ID" | "REG_DATE" | "REG_IP" | "UPD_USER_ID" | "UPD_DATE" | "UPD_IP" | "AUTHORITY_LEVEL";
export type tt_authorityCreationAttributes = Optional<tt_authorityAttributes, tt_authorityOptionalAttributes>;

export class tt_authority extends Model<tt_authorityAttributes, tt_authorityCreationAttributes> implements tt_authorityAttributes {
  AUTHORITY_ID!: number;
  AUTHORITY_NAME!: string;
  DEFAULT_TF!: string;
  DESCRIPTION?: string;
  USE_TF!: string;
  REG_USER_ID?: number;
  REG_DATE?: Date;
  REG_IP?: string;
  UPD_USER_ID?: number;
  UPD_DATE?: Date;
  UPD_IP?: string;
  AUTHORITY_LEVEL?: number;

  // tt_authority hasMany tt_api_list via API_AUTHORITY_ID
  tt_api_lists!: tt_api_list[];
  getTt_api_lists!: Sequelize.HasManyGetAssociationsMixin<tt_api_list>;
  setTt_api_lists!: Sequelize.HasManySetAssociationsMixin<tt_api_list, tt_api_listId>;
  addTt_api_list!: Sequelize.HasManyAddAssociationMixin<tt_api_list, tt_api_listId>;
  addTt_api_lists!: Sequelize.HasManyAddAssociationsMixin<tt_api_list, tt_api_listId>;
  createTt_api_list!: Sequelize.HasManyCreateAssociationMixin<tt_api_list>;
  removeTt_api_list!: Sequelize.HasManyRemoveAssociationMixin<tt_api_list, tt_api_listId>;
  removeTt_api_lists!: Sequelize.HasManyRemoveAssociationsMixin<tt_api_list, tt_api_listId>;
  hasTt_api_list!: Sequelize.HasManyHasAssociationMixin<tt_api_list, tt_api_listId>;
  hasTt_api_lists!: Sequelize.HasManyHasAssociationsMixin<tt_api_list, tt_api_listId>;
  countTt_api_lists!: Sequelize.HasManyCountAssociationsMixin;
  // tt_authority belongsTo tt_user via REG_USER_ID
  REG_USER!: tt_user;
  getREG_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setREG_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createREG_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_authority belongsTo tt_user via UPD_USER_ID
  UPD_USER!: tt_user;
  getUPD_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPD_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPD_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_authority {
    return tt_authority.init({
    AUTHORITY_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "권한 ID"
    },
    AUTHORITY_NAME: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "권한명"
    },
    DEFAULT_TF: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
      comment: "기본 권한 여부"
    },
    DESCRIPTION: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: "설명"
    },
    USE_TF: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "T",
      comment: "사용 여부"
    },
    REG_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "생성자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    REG_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일"
    },
    REG_IP: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "생성자 아이피"
    },
    UPD_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPD_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일"
    },
    UPD_IP: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "수정자 아이피"
    },
    AUTHORITY_LEVEL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "권한 레벨 ( 일반 : 1, 마스터 : 99)"
    }
  }, {
    sequelize,
    tableName: 'tt_authority',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AUTHORITY_ID" },
        ]
      },
      {
        name: "FK_tt_authority_REG_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "REG_USER_ID" },
        ]
      },
      {
        name: "FK_tt_authority_UPD_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPD_USER_ID" },
        ]
      },
    ]
  });
  }
}
