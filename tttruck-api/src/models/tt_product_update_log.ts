import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_product_image, tt_product_imageId } from './tt_product_image';

export interface tt_product_update_logAttributes {
  PRODUCT_ID?: number;
  PRODUCT_UPDATE_LOG_ID: number;
  SUBJECT: string;
  PRODUCT_CATEGORY_ID: number;
  PRODUCT_PRICE: number;
  SIZE_DIV: number;
  CONTENTS: string;
  PRODUCT_STATUS: number;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: number;
  SELLER_USER_IPv6?: any;
  UPLOAD_TIME?: Date;
  SHARED_TF?: string;
  TAG?: string;
  ADDRESS?: string;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_TIME?: Date;
}

export type tt_product_update_logPk = "PRODUCT_UPDATE_LOG_ID";
export type tt_product_update_logId = tt_product_update_log[tt_product_update_logPk];
export type tt_product_update_logOptionalAttributes = "PRODUCT_ID" | "PRODUCT_UPDATE_LOG_ID" | "SELLER_USER_ID" | "SELLER_USER_IPv4" | "SELLER_USER_IPv6" | "UPLOAD_TIME" | "SHARED_TF" | "TAG" | "ADDRESS" | "UPDATE_USER_ID" | "UPDATE_USER_IPv4" | "UPDATE_USER_IPv6" | "UPDATE_TIME";
export type tt_product_update_logCreationAttributes = Optional<tt_product_update_logAttributes, tt_product_update_logOptionalAttributes>;

export class tt_product_update_log extends Model<tt_product_update_logAttributes, tt_product_update_logCreationAttributes> implements tt_product_update_logAttributes {
  PRODUCT_ID?: number;
  PRODUCT_UPDATE_LOG_ID!: number;
  SUBJECT!: string;
  PRODUCT_CATEGORY_ID!: number;
  PRODUCT_PRICE!: number;
  SIZE_DIV!: number;
  CONTENTS!: string;
  PRODUCT_STATUS!: number;
  SELLER_USER_ID?: number;
  SELLER_USER_IPv4?: number;
  SELLER_USER_IPv6?: any;
  UPLOAD_TIME?: Date;
  SHARED_TF?: string;
  TAG?: string;
  ADDRESS?: string;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_TIME?: Date;

  // tt_product_update_log belongsTo tt_product via PRODUCT_ID
  PRODUCT!: tt_product;
  getPRODUCT!: Sequelize.BelongsToGetAssociationMixin<tt_product>;
  setPRODUCT!: Sequelize.BelongsToSetAssociationMixin<tt_product, tt_productId>;
  createPRODUCT!: Sequelize.BelongsToCreateAssociationMixin<tt_product>;
  // tt_product_update_log hasMany tt_product_image via PRODUCT_ID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product_update_log {
    return tt_product_update_log.init({
    PRODUCT_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "상품 ID",
      references: {
        model: 'tt_product',
        key: 'PRODUCT_ID'
      }
    },
    PRODUCT_UPDATE_LOG_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "상품  로그 ID"
    },
    SUBJECT: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "제목"
    },
    PRODUCT_CATEGORY_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "상품 카테고리"
    },
    PRODUCT_PRICE: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "가격"
    },
    SIZE_DIV: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "규격 ( 분위별 규격 )"
    },
    CONTENTS: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    PRODUCT_STATUS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "판매 상태 구분 ( 0: 판매중, 99: 거래완료)"
    },
    SELLER_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "판매 사용자 ID"
    },
    SELLER_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "판매자 IPv4"
    },
    SELLER_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "판매자 IPv6"
    },
    UPLOAD_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "판매 업로드일"
    },
    SHARED_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "공유 여부"
    },
    TAG: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: "태그"
    },
    ADDRESS: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "장소"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 ID"
    },
    UPDATE_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 IPv4"
    },
    UPDATE_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "수정 사용자 IPv6"
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일"
    }
  }, {
    sequelize,
    tableName: 'tt_product_update_log',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_UPDATE_LOG_ID" },
        ]
      },
      {
        name: "FK_tt_product_update_log_PRODUCT_ID_tt_product_PRODUCT_ID",
        using: "BTREE",
        fields: [
          { name: "PRODUCT_ID" },
        ]
      },
    ]
  });
  }
}
