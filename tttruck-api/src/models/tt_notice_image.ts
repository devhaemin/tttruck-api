import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_notice, tt_noticeId } from './tt_notice';

export interface tt_notice_imageAttributes {
  NOTICE_IMAGE_ID: number;
  NOTICE_ID: number;
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

export type tt_notice_imagePk = "NOTICE_IMAGE_ID";
export type tt_notice_imageId = tt_notice_image[tt_notice_imagePk];
export type tt_notice_imageOptionalAttributes = "NOTICE_IMAGE_ID" | "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_URL" | "THUMB_PATH" | "FILE_ID" | "CONTENT_ID" | "TIME";
export type tt_notice_imageCreationAttributes = Optional<tt_notice_imageAttributes, tt_notice_imageOptionalAttributes>;

export class tt_notice_image extends Model<tt_notice_imageAttributes, tt_notice_imageCreationAttributes> implements tt_notice_imageAttributes {
  NOTICE_IMAGE_ID!: number;
  NOTICE_ID!: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_ID?: number;
  CONTENT_ID?: number;
  TIME?: Date;

  // tt_notice_image belongsTo tt_notice via NOTICE_ID
  NOTICE!: tt_notice;
  getNOTICE!: Sequelize.BelongsToGetAssociationMixin<tt_notice>;
  setNOTICE!: Sequelize.BelongsToSetAssociationMixin<tt_notice, tt_noticeId>;
  createNOTICE!: Sequelize.BelongsToCreateAssociationMixin<tt_notice>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_notice_image {
    return tt_notice_image.init({
    NOTICE_IMAGE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "상품 이미지 ID"
    },
    NOTICE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "상품 ID",
      references: {
        model: 'tt_notice',
        key: 'NOTICE_ID'
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
    tableName: 'tt_notice_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NOTICE_IMAGE_ID" },
        ]
      },
      {
        name: "FK_tt_notice_image_CONTENT_ID_tt_content_CONTENT_ID",
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
        ]
      },
      {
        name: "FK_tt_notice_image_FILE_ID_tt_file_FILE_ID",
        using: "BTREE",
        fields: [
          { name: "FILE_ID" },
        ]
      },
      {
        name: "tt_notice_image_tt_notice_NOTICE_ID_fk",
        using: "BTREE",
        fields: [
          { name: "NOTICE_ID" },
        ]
      },
    ]
  });
  }
}
