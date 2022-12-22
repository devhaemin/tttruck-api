import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';

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
export type tt_product_imageOptionalAttributes = "PRODUCT_IMAGE_ID" | "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_URL" | "THUMB_PATH" | "FILE_ID" | "CONTENT_ID" | "TIME";
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

  // tt_product_image belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product_image {
    return tt_product_image.init({
    PRODUCT_IMAGE_ID: {
      autoIncrement: true,
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
        model: 'tt_product',
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
      comment: "파일 ID"
    },
    CONTENT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "컨텐츠 ID"
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
        name: "FK_tt_product_image_CONTENT_ID_tt_content_CONTENT_ID",
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
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
        name: "FK_tt_product_image_PRODUCT_ID_tt_product_update_log_PRODUCT_ID",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
    ]
  });
  }
}
