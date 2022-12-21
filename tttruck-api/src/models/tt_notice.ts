import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_content, tt_contentId } from './tt_content';
import type { tt_notice_master, tt_notice_masterId } from './tt_notice_master';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_noticeAttributes {
  NOTICE_MASTER_ID: number;
  MAIN_NOTICE_ID: number;
  SUBJECT?: string;
  HTML_TF?: string;
  CONTENTS?: string;
  DISPLAY_TF?: string;
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
  TOP_FIX_TF: string;
}

export type tt_noticePk = "MAIN_NOTICE_ID";
export type tt_noticeId = tt_notice[tt_noticePk];
export type tt_noticeOptionalAttributes = "SUBJECT" | "HTML_TF" | "CONTENTS" | "DISPLAY_TF" | "DISPLAY_START_TIME" | "DISPLAY_END_TIME" | "POST_USER_ID" | "POST_TIME" | "POST_IPv4" | "POST_IPv6" | "UPDATE_USER_ID" | "UPDATE_TIME" | "UPDATE_IPv4" | "UPDATE_IPv6" | "CONTENT_ID" | "TOP_FIX_TF";
export type tt_noticeCreationAttributes = Optional<tt_noticeAttributes, tt_noticeOptionalAttributes>;

export class tt_notice extends Model<tt_noticeAttributes, tt_noticeCreationAttributes> implements tt_noticeAttributes {
  NOTICE_MASTER_ID!: number;
  MAIN_NOTICE_ID!: number;
  SUBJECT?: string;
  HTML_TF?: string;
  CONTENTS?: string;
  DISPLAY_TF?: string;
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
  TOP_FIX_TF!: string;

  // tt_notice belongsTo tt_content via CONTENT_ID
  CONTENT!: tt_content;
  getCONTENT!: Sequelize.BelongsToGetAssociationMixin<tt_content>;
  setCONTENT!: Sequelize.BelongsToSetAssociationMixin<tt_content, tt_contentId>;
  createCONTENT!: Sequelize.BelongsToCreateAssociationMixin<tt_content>;
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
    MAIN_NOTICE_ID: {
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
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "F",
      comment: "HTML 여부"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "내용"
    },
    DISPLAY_TF: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "T",
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
      defaultValue: "0000-00-00 00:00:00",
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
      comment: "컨텐츠 ID",
      references: {
        model: 'tt_content',
        key: 'CONTENT_ID'
      }
    },
    TOP_FIX_TF: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
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
          { name: "MAIN_NOTICE_ID" },
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
