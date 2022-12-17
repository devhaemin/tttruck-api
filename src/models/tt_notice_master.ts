import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_notice, tt_noticeId } from './tt_notice';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_notice_masterAttributes {
  NOTICE_MASTER_ID: number;
  TITLE?: string;
  COMMENT_TF?: string;
  SECRET_TF?: string;
  ATTACH_TF?: string;
  DISPLAY_TF?: string;
  DIV_CODE?: string;
  CREATE_USER_ID?: number;
  CREATE_DATE?: Date;
  REG_IPv4?: number;
  REG_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_DATE?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  EXTRA_FIELD_FIRST_LABEL?: string;
  EXTRA_FIELD_FIRST_CODE?: string;
  DELETE_TF?: string;
}

export type tt_notice_masterPk = "NOTICE_MASTER_ID";
export type tt_notice_masterId = tt_notice_master[tt_notice_masterPk];
export type tt_notice_masterOptionalAttributes = "TITLE" | "COMMENT_TF" | "SECRET_TF" | "ATTACH_TF" | "DISPLAY_TF" | "DIV_CODE" | "CREATE_USER_ID" | "CREATE_DATE" | "REG_IPv4" | "REG_IPv6" | "UPDATE_USER_ID" | "UPDATE_DATE" | "UPDATE_IPv4" | "UPDATE_IPv6" | "EXTRA_FIELD_FIRST_LABEL" | "EXTRA_FIELD_FIRST_CODE" | "DELETE_TF";
export type tt_notice_masterCreationAttributes = Optional<tt_notice_masterAttributes, tt_notice_masterOptionalAttributes>;

export class tt_notice_master extends Model<tt_notice_masterAttributes, tt_notice_masterCreationAttributes> implements tt_notice_masterAttributes {
  NOTICE_MASTER_ID!: number;
  TITLE?: string;
  COMMENT_TF?: string;
  SECRET_TF?: string;
  ATTACH_TF?: string;
  DISPLAY_TF?: string;
  DIV_CODE?: string;
  CREATE_USER_ID?: number;
  CREATE_DATE?: Date;
  REG_IPv4?: number;
  REG_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_DATE?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  EXTRA_FIELD_FIRST_LABEL?: string;
  EXTRA_FIELD_FIRST_CODE?: string;
  DELETE_TF?: string;

  // tt_notice_master hasMany tt_notice via NOTICE_MASTER_ID
  tt_notices!: tt_notice[];
  getTt_notices!: Sequelize.HasManyGetAssociationsMixin<tt_notice>;
  setTt_notices!: Sequelize.HasManySetAssociationsMixin<tt_notice, tt_noticeId>;
  addTt_notice!: Sequelize.HasManyAddAssociationMixin<tt_notice, tt_noticeId>;
  addTt_notices!: Sequelize.HasManyAddAssociationsMixin<tt_notice, tt_noticeId>;
  createTt_notice!: Sequelize.HasManyCreateAssociationMixin<tt_notice>;
  removeTt_notice!: Sequelize.HasManyRemoveAssociationMixin<tt_notice, tt_noticeId>;
  removeTt_notices!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice, tt_noticeId>;
  hasTt_notice!: Sequelize.HasManyHasAssociationMixin<tt_notice, tt_noticeId>;
  hasTt_notices!: Sequelize.HasManyHasAssociationsMixin<tt_notice, tt_noticeId>;
  countTt_notices!: Sequelize.HasManyCountAssociationsMixin;
  // tt_notice_master belongsTo tt_user via CREATE_USER_ID
  CREATE_USER!: tt_user;
  getCREATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setCREATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createCREATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_notice_master belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_notice_master {
    return tt_notice_master.init({
    NOTICE_MASTER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "소식 카테고리 ID"
    },
    TITLE: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "소식 카테고리 이름"
    },
    COMMENT_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "T",
      comment: "댓글 사용 여부"
    },
    SECRET_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "F",
      comment: "비밀글 사용 여부"
    },
    ATTACH_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "T",
      comment: "첨부파일 사용 여부"
    },
    DISPLAY_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "F",
      comment: "노출 사용 여부"
    },
    DIV_CODE: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "분류 코드"
    },
    CREATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "생성 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    CREATE_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일"
    },
    REG_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "생성자 IPv4"
    },
    REG_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "생성자 IPv6"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPDATE_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일"
    },
    UPDATE_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "수정자 IPv4"
    },
    UPDATE_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "수정자 IPv6"
    },
    EXTRA_FIELD_FIRST_LABEL: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "공통 레이블"
    },
    EXTRA_FIELD_FIRST_CODE: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "레이블 값"
    },
    DELETE_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "F",
      comment: "삭제 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_notice_master',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NOTICE_MASTER_ID" },
        ]
      },
      {
        name: "FK_tt_notice_master_CREATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "CREATE_USER_ID" },
        ]
      },
      {
        name: "FK_tt_notice_master_UPDATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
    ]
  });
  }
}
