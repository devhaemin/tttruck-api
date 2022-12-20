import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {
  tt_product_category,
  tt_product_categoryId,
} from './tt_product_category';
import type {
  tt_product_trade_log,
  tt_product_trade_logId,
} from './tt_product_trade_log';
import type {
  tt_product_update_log,
  tt_product_update_logId,
} from './tt_product_update_log';
import type {tt_user, tt_userId} from './tt_user';

export interface tt_productAttributes {
  PRODUCT_ID: number;
  SUBJECT: string;
  PRIORITY: number;
  PRODUCT_CATEGORY_ID: number;
  PRODUCT_PRICE: number;
  PRODUCT_SIZE: string;
  PRODUCT_WEIGHT: number;
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
  UPDATE_DATE?: Date;
}

export type tt_productPk = "PRODUCT_ID";
export type tt_productId = tt_product[tt_productPk];
export type tt_productOptionalAttributes =
  "PRODUCT_ID"
  | "PRIORITY"
  | "SELLER_USER_ID"
  | "SELLER_USER_IPv4"
  | "SELLER_USER_IPv6"
  | "UPLOAD_TIME"
  | "SHARED_TF"
  | "TAG"
  | "ADDRESS"
  | "UPDATE_USER_ID"
  | "UPDATE_USER_IPv4"
  | "UPDATE_USER_IPv6"
  | "UPDATE_DATE";
export type tt_productCreationAttributes = Optional<tt_productAttributes, tt_productOptionalAttributes>;

export class tt_product extends Model<tt_productAttributes, tt_productCreationAttributes> implements tt_productAttributes {
  PRODUCT_ID!: number;
  SUBJECT!: string;
  PRIORITY!: number;
  PRODUCT_CATEGORY_ID!: number;
  PRODUCT_PRICE!: number;
  PRODUCT_SIZE!: string;
  PRODUCT_WEIGHT!: number;
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
  UPDATE_DATE?: Date;

  // tt_product hasMany tt_product_trade_log via PRODUCT_ID
  tt_product_trade_logs!: tt_product_trade_log[];
  getTt_product_trade_logs!: Sequelize.HasManyGetAssociationsMixin<tt_product_trade_log>;
  setTt_product_trade_logs!: Sequelize.HasManySetAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  addTt_product_trade_log!: Sequelize.HasManyAddAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  addTt_product_trade_logs!: Sequelize.HasManyAddAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  createTt_product_trade_log!: Sequelize.HasManyCreateAssociationMixin<tt_product_trade_log>;
  removeTt_product_trade_log!: Sequelize.HasManyRemoveAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  removeTt_product_trade_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  hasTt_product_trade_log!: Sequelize.HasManyHasAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  hasTt_product_trade_logs!: Sequelize.HasManyHasAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  countTt_product_trade_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product hasMany tt_product_update_log via PRODUCT_ID
  tt_product_update_logs!: tt_product_update_log[];
  getTt_product_update_logs!: Sequelize.HasManyGetAssociationsMixin<tt_product_update_log>;
  setTt_product_update_logs!: Sequelize.HasManySetAssociationsMixin<tt_product_update_log, tt_product_update_logId>;
  addTt_product_update_log!: Sequelize.HasManyAddAssociationMixin<tt_product_update_log, tt_product_update_logId>;
  addTt_product_update_logs!: Sequelize.HasManyAddAssociationsMixin<tt_product_update_log, tt_product_update_logId>;
  createTt_product_update_log!: Sequelize.HasManyCreateAssociationMixin<tt_product_update_log>;
  removeTt_product_update_log!: Sequelize.HasManyRemoveAssociationMixin<tt_product_update_log, tt_product_update_logId>;
  removeTt_product_update_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_update_log, tt_product_update_logId>;
  hasTt_product_update_log!: Sequelize.HasManyHasAssociationMixin<tt_product_update_log, tt_product_update_logId>;
  hasTt_product_update_logs!: Sequelize.HasManyHasAssociationsMixin<tt_product_update_log, tt_product_update_logId>;
  countTt_product_update_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product belongsTo tt_product_category via PRODUCT_CATEGORY_ID
  PRODUCT_CATEGORY!: tt_product_category;
  getPRODUCT_CATEGORY!: Sequelize.BelongsToGetAssociationMixin<tt_product_category>;
  setPRODUCT_CATEGORY!: Sequelize.BelongsToSetAssociationMixin<tt_product_category, tt_product_categoryId>;
  createPRODUCT_CATEGORY!: Sequelize.BelongsToCreateAssociationMixin<tt_product_category>;
  // tt_product belongsTo tt_user via SELLER_USER_ID
  SELLER_USER!: tt_user;
  getSELLER_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setSELLER_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createSELLER_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product {
    return tt_product.init({
      PRODUCT_ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: "상품 ID",
      },
      SUBJECT: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "제목",
      },
      PRIORITY: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999,
        comment: "정렬 우선순위",
      },
      PRODUCT_CATEGORY_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "상품 카테고리",
        references: {
          model: 'tt_product_category',
          key: 'PRODUCT_CATEGORY_ID',
        },
      },
      PRODUCT_PRICE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "가격",
      },
      PRODUCT_SIZE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "규격 ( 분위별 규격 )",
      },
      PRODUCT_WEIGHT: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "상품 무게",
      },
      CONTENTS: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "내용",
      },
      PRODUCT_STATUS: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "판매 상태 구분 ( 0: 판매중, 99: 거래완료)",
      },
      SELLER_USER_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "판매 사용자 ID",
        references: {
          model: 'tt_user',
          key: 'USER_ID',
        },
      },
      SELLER_USER_IPv4: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "판매자 IPv4",
      },
      SELLER_USER_IPv6: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "판매자 IPv6",
      },
      UPLOAD_TIME: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
        comment: "판매 업로드일",
      },
      SHARED_TF: {
        type: DataTypes.STRING(1),
        allowNull: true,
        comment: "공유 여부",
      },
      TAG: {
        type: DataTypes.STRING(300),
        allowNull: true,
        comment: "태그",
      },
      ADDRESS: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "장소",
      },
      UPDATE_USER_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "수정 사용자 ID",
      },
      UPDATE_USER_IPv4: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        comment: "수정 사용자 IPv4",
      },
      UPDATE_USER_IPv6: {
        type: DataTypes.BLOB,
        allowNull: true,
        comment: "수정 사용자 IPv6",
      },
      UPDATE_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
        comment: "수정일",
      },
    }, {
      sequelize,
      tableName: 'tt_product',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {name: "PRODUCT_ID"},
          ],
        },
        {
          name: "FK_tt_product_SELLER_USER_ID_tt_user_USER_ID",
          using: "BTREE",
          fields: [
            {name: "SELLER_USER_ID"},
          ],
        },
        {
          name: "tt_product_tt_product_category_null_fk",
          using: "BTREE",
          fields: [
            {name: "PRODUCT_CATEGORY_ID"},
          ],
        },
      ],
    });
  }
}
