import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_notice_image, tt_notice_imageId } from './tt_notice_image';
import type { tt_notice_master, tt_notice_masterId } from './tt_notice_master';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_noticeAttributes {
  NOTICE_MASTER_ID: number;
  NOTICE_ID: number;
  SUBJECT?: string;
  HTML_TF?: number;
  CONTENTS?: string;
  DISPLAY_TF?: number;
  DISPLAY_START_TIME?: Date;
  DISPLAY_END_TIME?: Date;
  POST_USER_ID?: number;
  POST_TIME?: Date;
  POST_IPv4?: number;
  POST_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_TIME?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  CONTENT_ID?: number;
  TOP_FIX_TF: number;
}

export type tt_noticePk = "NOTICE_ID";
export type tt_noticeId = tt_notice[tt_noticePk];
export type tt_noticeOptionalAttributes = "NOTICE_ID" | "SUBJECT" | "HTML_TF" | "CONTENTS" | "DISPLAY_TF" | "DISPLAY_START_TIME" | "DISPLAY_END_TIME" | "POST_USER_ID" | "POST_TIME" | "POST_IPv4" | "POST_IPv6" | "UPDATE_USER_ID" | "UPDATE_TIME" | "UPDATE_IPv4" | "UPDATE_IPv6" | "CONTENT_ID" | "TOP_FIX_TF";
export type tt_noticeCreationAttributes = Optional<tt_noticeAttributes, tt_noticeOptionalAttributes>;

export class tt_notice extends Model<tt_noticeAttributes, tt_noticeCreationAttributes> implements tt_noticeAttributes {
  NOTICE_MASTER_ID!: number;
  NOTICE_ID!: number;
  SUBJECT?: string;
  HTML_TF?: number;
  CONTENTS?: string;
  DISPLAY_TF?: number;
  DISPLAY_START_TIME?: Date;
  DISPLAY_END_TIME?: Date;
  POST_USER_ID?: number;
  POST_TIME?: Date;
  POST_IPv4?: number;
  POST_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_TIME?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  CONTENT_ID?: number;
  TOP_FIX_TF!: number;

  // tt_notice hasMany tt_notice_image via NOTICE_ID
  tt_notice_images!: tt_notice_image[];
  getTt_notice_images!: Sequelize.HasManyGetAssociationsMixin<tt_notice_image>;
  setTt_notice_images!: Sequelize.HasManySetAssociationsMixin<tt_notice_image, tt_notice_imageId>;
  addTt_notice_image!: Sequelize.HasManyAddAssociationMixin<tt_notice_image, tt_notice_imageId>;
  addTt_notice_images!: Sequelize.HasManyAddAssociationsMixin<tt_notice_image, tt_notice_imageId>;
  createTt_notice_image!: Sequelize.HasManyCreateAssociationMixin<tt_notice_image>;
  removeTt_notice_image!: Sequelize.HasManyRemoveAssociationMixin<tt_notice_image, tt_notice_imageId>;
  removeTt_notice_images!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice_image, tt_notice_imageId>;
  hasTt_notice_image!: Sequelize.HasManyHasAssociationMixin<tt_notice_image, tt_notice_imageId>;
  hasTt_notice_images!: Sequelize.HasManyHasAssociationsMixin<tt_notice_image, tt_notice_imageId>;
  countTt_notice_images!: Sequelize.HasManyCountAssociationsMixin;
  // tt_notice belongsTo tt_notice_master via NOTICE_MASTER_ID
  NOTICE_MASTER!: tt_notice_master;
  getNOTICE_MASTER!: Sequelize.BelongsToGetAssociationMixin<tt_notice_master>;
  setNOTICE_MASTER!: Sequelize.BelongsToSetAssociationMixin<tt_notice_master, tt_notice_masterId>;
  createNOTICE_MASTER!: Sequelize.BelongsToCreateAssociationMixin<tt_notice_master>;
  // tt_notice belongsTo tt_user via POST_USER_ID
  POST_USER!: tt_user;
  getPOST_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setPOST_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createPOST_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_notice belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_notice {
    return tt_notice.init({
    NOTICE_MASTER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "소식 카테고리 ID",
      references: {
        model: 'tt_notice_master',
        key: 'NOTICE_MASTER_ID'
      }
    },
    NOTICE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "메인공지 ID"
    },
    SUBJECT: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "제목"
    },
    HTML_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "HTML 여부"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "내용"
    },
    DISPLAY_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "노출 여부"
    },
    DISPLAY_START_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "게시 시작일"
    },
    DISPLAY_END_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "게시 종료일"
    },
    POST_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "생성자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    POST_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "작성일"
    },
    POST_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "작성자 IPv4"
    },
    POST_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "작성자 IPv6"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
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
    CONTENT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "컨텐츠 ID"
    },
    TOP_FIX_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "상단 고정 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_notice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NOTICE_ID" },
        ]
      },
      {
        name: "FK_tt_notice_CONTENT_ID_tt_content_CONTENT_ID",
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
        ]
      },
      {
        name: "FK_tt_notice_NOTICE_MASTER_ID_tt_notice_master_NOTICE_MASTER_ID",
        using: "BTREE",
        fields: [
          { name: "NOTICE_MASTER_ID" },
        ]
      },
      {
        name: "FK_tt_notice_POST_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "POST_USER_ID" },
        ]
      },
      {
        name: "FK_tt_notice_UPDATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
    ]
  });
  }
}
