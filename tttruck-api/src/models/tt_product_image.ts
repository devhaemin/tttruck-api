import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_content, tt_contentId } from './tt_content';
import type { tt_file, tt_fileId } from './tt_file';
import type { tt_product_update_log, tt_product_update_logId } from './tt_product_update_log';

export interface tt_product_imageAttributes {
  PRODUCT_IMAGE_ID: number;
  PRODUCT_ID: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_ID?: number;
  CONTENT_ID?: number;
  TIME?: Date;
}

export type tt_product_imagePk = "PRODUCT_IMAGE_ID";
export type tt_product_imageId = tt_product_image[tt_product_imagePk];
export type tt_product_imageOptionalAttributes = "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_URL" | "THUMB_PATH" | "FILE_ID" | "CONTENT_ID" | "TIME";
export type tt_product_imageCreationAttributes = Optional<tt_product_imageAttributes, tt_product_imageOptionalAttributes>;

export class tt_product_image extends Model<tt_product_imageAttributes, tt_product_imageCreationAttributes> implements tt_product_imageAttributes {
  PRODUCT_IMAGE_ID!: number;
  PRODUCT_ID!: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_ID?: number;
  CONTENT_ID?: number;
  TIME?: Date;

  // tt_product_image belongsTo tt_content via CONTENT_ID
  CONTENT!: tt_content;
  getCONTENT!: Sequelize.BelongsToGetAssociationMixin<tt_content>;
  setCONTENT!: Sequelize.BelongsToSetAssociationMixin<tt_content, tt_contentId>;
  createCONTENT!: Sequelize.BelongsToCreateAssociationMixin<tt_content>;
  // tt_product_image belongsTo tt_file via FILE_ID
  FILE!: tt_file;
  getFILE!: Sequelize.BelongsToGetAssociationMixin<tt_file>;
  setFILE!: Sequelize.BelongsToSetAssociationMixin<tt_file, tt_fileId>;
  createFILE!: Sequelize.BelongsToCreateAssociationMixin<tt_file>;
  // tt_product_image belongsTo tt_product_update_log via PRODUCT_ID
  PRODUCT!: tt_product_update_log;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product_update_log>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product_update_log, tt_product_update_logId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product_update_log>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product_image {
    return tt_product_image.init({
    PRODUCT_IMAGE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "상품 이미지 ID"
    },
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "상품 ID",
      references: {
        model: 'tt_product_update_log',
        key: 'PRODUCT_ID'
      }
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
    FILE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "파일 ID",
      references: {
        model: 'tt_file',
        key: 'FILE_ID'
      }
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
    TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_product_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_IMAGE_ID" },
        ]
      },
      {
        name: "FK_tt_product_image_PRODUCT_ID_tt_product_update_log_PRODUCT_ID",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
      {
        name: "FK_tt_product_image_FILE_ID_tt_file_FILE_ID",
        using: "BTREE",
        fields: [
          { name: "FILE_ID" },
        ]
      },
      {
        name: "FK_tt_product_image_CONTENT_ID_tt_content_CONTENT_ID",
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
        ]
      },
    ]
  });
  }
}
