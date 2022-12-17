import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_content, tt_contentId } from './tt_content';
import type { tt_file_download_log, tt_file_download_logId } from './tt_file_download_log';
import type { tt_notice_image, tt_notice_imageId } from './tt_notice_image';
import type { tt_product_image, tt_product_imageId } from './tt_product_image';

export interface tt_fileAttributes {
  FILE_ID: number;
  CONTENT_ID: number;
  CONTENT_TYPE?: string;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_DOWNLOAD_COUNT: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_TYPE?: string;
}

export type tt_filePk = "FILE_ID";
export type tt_fileId = tt_file[tt_filePk];
export type tt_fileOptionalAttributes = "CONTENT_TYPE" | "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_DOWNLOAD_COUNT" | "FILE_URL" | "THUMB_PATH" | "FILE_TYPE";
export type tt_fileCreationAttributes = Optional<tt_fileAttributes, tt_fileOptionalAttributes>;

export class tt_file extends Model<tt_fileAttributes, tt_fileCreationAttributes> implements tt_fileAttributes {
  FILE_ID!: number;
  CONTENT_ID!: number;
  CONTENT_TYPE?: string;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_DOWNLOAD_COUNT!: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_TYPE?: string;

  // tt_file belongsTo tt_content via CONTENT_ID
  CONTENT!: tt_content;
  getCONTENT!: Sequelize.BelongsToGetAssociationMixin<tt_content>;
  setCONTENT!: Sequelize.BelongsToSetAssociationMixin<tt_content, tt_contentId>;
  createCONTENT!: Sequelize.BelongsToCreateAssociationMixin<tt_content>;
  // tt_file hasMany tt_file_download_log via FILE_ID
  tt_file_download_logs!: tt_file_download_log[];
  getTt_file_download_logs!: Sequelize.HasManyGetAssociationsMixin<tt_file_download_log>;
  setTt_file_download_logs!: Sequelize.HasManySetAssociationsMixin<tt_file_download_log, tt_file_download_logId>;
  addTt_file_download_log!: Sequelize.HasManyAddAssociationMixin<tt_file_download_log, tt_file_download_logId>;
  addTt_file_download_logs!: Sequelize.HasManyAddAssociationsMixin<tt_file_download_log, tt_file_download_logId>;
  createTt_file_download_log!: Sequelize.HasManyCreateAssociationMixin<tt_file_download_log>;
  removeTt_file_download_log!: Sequelize.HasManyRemoveAssociationMixin<tt_file_download_log, tt_file_download_logId>;
  removeTt_file_download_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_file_download_log, tt_file_download_logId>;
  hasTt_file_download_log!: Sequelize.HasManyHasAssociationMixin<tt_file_download_log, tt_file_download_logId>;
  hasTt_file_download_logs!: Sequelize.HasManyHasAssociationsMixin<tt_file_download_log, tt_file_download_logId>;
  countTt_file_download_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_file hasMany tt_notice_image via FILE_ID
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
  // tt_file hasMany tt_product_image via FILE_ID
  tt_product_images!: tt_product_image[];
  getTt_product_images!: Sequelize.HasManyGetAssociationsMixin<tt_product_image>;
  setTt_product_images!: Sequelize.HasManySetAssociationsMixin<tt_product_image, tt_product_imageId>;
  addTt_product_image!: Sequelize.HasManyAddAssociationMixin<tt_product_image, tt_product_imageId>;
  addTt_product_images!: Sequelize.HasManyAddAssociationsMixin<tt_product_image, tt_product_imageId>;
  createTt_product_image!: Sequelize.HasManyCreateAssociationMixin<tt_product_image>;
  removeTt_product_image!: Sequelize.HasManyRemoveAssociationMixin<tt_product_image, tt_product_imageId>;
  removeTt_product_images!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_image, tt_product_imageId>;
  hasTt_product_image!: Sequelize.HasManyHasAssociationMixin<tt_product_image, tt_product_imageId>;
  hasTt_product_images!: Sequelize.HasManyHasAssociationsMixin<tt_product_image, tt_product_imageId>;
  countTt_product_images!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_file {
    return tt_file.init({
    FILE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "파일 ID"
    },
    CONTENT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "컨텐츠 ID",
      references: {
        model: 'tt_content',
        key: 'CONTENT_ID'
      }
    },
    CONTENT_TYPE: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "컨텐츠 타입"
    },
    FILE_NAME: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "첨부파일명"
    },
    FILE_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "첨부파일 경로"
    },
    FILE_SIZE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "첨부파일 크기"
    },
    ORG_FILE_SEQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "기존 파일 시퀀스"
    },
    FILE_DOWNLOAD_COUNT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "다운로드 횟수"
    },
    FILE_URL: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "다운로드 URL"
    },
    THUMB_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "썸네일 경로"
    },
    FILE_TYPE: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "파일 타입"
    }
  }, {
    sequelize,
    tableName: 'tt_file',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "FILE_ID" },
        ]
      },
      {
        name: "FK_tt_file_CONTENT_ID_tt_content_CONTENT_ID",
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
        ]
      },
    ]
  });
  }
}
