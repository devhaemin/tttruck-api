import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_trucker_center_image, tt_trucker_center_imageId } from './tt_trucker_center_image';
import type { tt_trucker_center_master, tt_trucker_center_masterId } from './tt_trucker_center_master';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_trucker_centerAttributes {
  TRUCKER_CENTER_MASTER_ID: number;
  TRUCKER_CENTER_ID: number;
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

export type tt_trucker_centerPk = "TRUCKER_CENTER_ID";
export type tt_trucker_centerId = tt_trucker_center[tt_trucker_centerPk];
export type tt_trucker_centerOptionalAttributes = "TRUCKER_CENTER_ID" | "SUBJECT" | "HTML_TF" | "CONTENTS" | "DISPLAY_TF" | "DISPLAY_START_TIME" | "DISPLAY_END_TIME" | "POST_USER_ID" | "POST_TIME" | "POST_IPv4" | "POST_IPv6" | "UPDATE_USER_ID" | "UPDATE_TIME" | "UPDATE_IPv4" | "UPDATE_IPv6" | "CONTENT_ID" | "TOP_FIX_TF";
export type tt_trucker_centerCreationAttributes = Optional<tt_trucker_centerAttributes, tt_trucker_centerOptionalAttributes>;

export class tt_trucker_center extends Model<tt_trucker_centerAttributes, tt_trucker_centerCreationAttributes> implements tt_trucker_centerAttributes {
  TRUCKER_CENTER_MASTER_ID!: number;
  TRUCKER_CENTER_ID!: number;
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

  // tt_trucker_center hasMany tt_trucker_center_image via TRUCKER_CENTER_ID
  tt_trucker_center_images!: tt_trucker_center_image[];
  getTt_trucker_center_images!: Sequelize.HasManyGetAssociationsMixin<tt_trucker_center_image>;
  setTt_trucker_center_images!: Sequelize.HasManySetAssociationsMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  addTt_trucker_center_image!: Sequelize.HasManyAddAssociationMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  addTt_trucker_center_images!: Sequelize.HasManyAddAssociationsMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  createTt_trucker_center_image!: Sequelize.HasManyCreateAssociationMixin<tt_trucker_center_image>;
  removeTt_trucker_center_image!: Sequelize.HasManyRemoveAssociationMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  removeTt_trucker_center_images!: Sequelize.HasManyRemoveAssociationsMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  hasTt_trucker_center_image!: Sequelize.HasManyHasAssociationMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  hasTt_trucker_center_images!: Sequelize.HasManyHasAssociationsMixin<tt_trucker_center_image, tt_trucker_center_imageId>;
  countTt_trucker_center_images!: Sequelize.HasManyCountAssociationsMixin;
  // tt_trucker_center belongsTo tt_trucker_center_master via TRUCKER_CENTER_MASTER_ID
  TRUCKER_CENTER_MASTER!: tt_trucker_center_master;
  getTRUCKER_CENTER_MASTER!: Sequelize.BelongsToGetAssociationMixin<tt_trucker_center_master>;
  setTRUCKER_CENTER_MASTER!: Sequelize.BelongsToSetAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  createTRUCKER_CENTER_MASTER!: Sequelize.BelongsToCreateAssociationMixin<tt_trucker_center_master>;
  // tt_trucker_center belongsTo tt_user via POST_USER_ID
  POST_USER!: tt_user;
  getPOST_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setPOST_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createPOST_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_trucker_center belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trucker_center {
    return tt_trucker_center.init({
    TRUCKER_CENTER_MASTER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "트러커 센터 카테고리 ID. 소식 카테고리 ID",
      references: {
        model: 'tt_trucker_center_master',
        key: 'TRUCKER_CENTER_MASTER_ID'
      }
    },
    TRUCKER_CENTER_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "트러커센터 ID. 메인공지 ID"
    },
    SUBJECT: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "제목. 제목"
    },
    HTML_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "HTML 여부. HTML 여부"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "내용. 내용"
    },
    DISPLAY_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "노출 여부. 노출 여부"
    },
    DISPLAY_START_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "게시 시작일. 게시 시작일"
    },
    DISPLAY_END_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "게시 종료일. 게시 종료일"
    },
    POST_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "생성자 아이디. 생성자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    POST_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "작성일. 작성일"
    },
    POST_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "작성자 IPv4. 작성자 IPv4"
    },
    POST_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "작성자 IPv6. 작성자 IPv6"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정자 아이디. 수정자 아이디",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일. 수정일"
    },
    UPDATE_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "수정자 IPv4. 수정자 IPv4"
    },
    UPDATE_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "수정자 IPv6. 수정자 IPv6"
    },
    CONTENT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "컨텐츠 ID. 컨텐츠 ID"
    },
    TOP_FIX_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "상단 고정 여부. 상단 고정 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_trucker_center',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TRUCKER_CENTER_ID" },
        ]
      },
      {
        name: "FK_tt_trucker_center_POST_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "POST_USER_ID" },
        ]
      },
      {
        name: "FK_tt_trucker_center_UPDATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
      {
        name: "tt_trucker_center_tt_trucker_center_master_fk",
        using: "BTREE",
        fields: [
          { name: "TRUCKER_CENTER_MASTER_ID" },
        ]
      },
    ]
  });
  }
}
