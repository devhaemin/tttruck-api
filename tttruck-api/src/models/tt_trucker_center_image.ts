import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_trucker_center, tt_trucker_centerId } from './tt_trucker_center';

export interface tt_trucker_center_imageAttributes {
  TRUCKER_CENTER_IMAGE_ID: number;
  TRUCKER_CENTER_ID: number;
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

export type tt_trucker_center_imagePk = "TRUCKER_CENTER_IMAGE_ID";
export type tt_trucker_center_imageId = tt_trucker_center_image[tt_trucker_center_imagePk];
export type tt_trucker_center_imageOptionalAttributes = "TRUCKER_CENTER_IMAGE_ID" | "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_URL" | "THUMB_PATH" | "FILE_ID" | "CONTENT_ID" | "TIME";
export type tt_trucker_center_imageCreationAttributes = Optional<tt_trucker_center_imageAttributes, tt_trucker_center_imageOptionalAttributes>;

export class tt_trucker_center_image extends Model<tt_trucker_center_imageAttributes, tt_trucker_center_imageCreationAttributes> implements tt_trucker_center_imageAttributes {
  TRUCKER_CENTER_IMAGE_ID!: number;
  TRUCKER_CENTER_ID!: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  FILE_ID?: number;
  CONTENT_ID?: number;
  TIME?: Date;

  // tt_trucker_center_image belongsTo tt_trucker_center via TRUCKER_CENTER_ID
  TRUCKER_CENTER!: tt_trucker_center;
  getTRUCKER_CENTER!: Sequelize.BelongsToGetAssociationMixin<tt_trucker_center>;
  setTRUCKER_CENTER!: Sequelize.BelongsToSetAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  createTRUCKER_CENTER!: Sequelize.BelongsToCreateAssociationMixin<tt_trucker_center>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trucker_center_image {
    return tt_trucker_center_image.init({
    TRUCKER_CENTER_IMAGE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "트러커센터 이미지 ID. 상품 이미지 ID"
    },
    TRUCKER_CENTER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "트러커센터 ID. 상품 ID",
      references: {
        model: 'tt_trucker_center',
        key: 'TRUCKER_CENTER_ID'
      }
    },
    FILE_NAME: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "첨부파일명. 첨부파일명"
    },
    FILE_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "첨부파일 경로. 첨부파일 경로"
    },
    FILE_SIZE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "첨부파일 크기. 첨부파일 크기"
    },
    ORG_FILE_SEQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "기존 파일 시퀀스. 기존 파일 시퀀스"
    },
    FILE_URL: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "다운로드 URL. 다운로드 URL"
    },
    THUMB_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true,
      comment: "썸네일 경로. 썸네일 경로"
    },
    FILE_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "파일 ID. 파일 ID"
    },
    CONTENT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "컨텐츠 ID. 컨텐츠 ID"
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_trucker_center_image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TRUCKER_CENTER_IMAGE_ID" },
        ]
      },
      {
        name: "FK_tt_trucker_center_image_TRUCKER_CENTER_ID_tt_trucker_center_T",
        using: "BTREE",
        fields: [
          { name: "TRUCKER_CENTER_ID" },
        ]
      },
    ]
  });
  }
}
