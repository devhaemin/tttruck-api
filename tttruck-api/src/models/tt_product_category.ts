import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_product_categoryAttributes {
  PRODUCT_CATEGORY_ID: number;
  PRODUCT_CATEGORY_NAME?: string;
  PRODUCT_CATEGORY_PRIORITY?: number;
  VISIBLE_TF?: string;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_TIME?: Date;
  CREATE_USER_ID?: number;
  CREATE_USER_IPv4?: number;
  CREATE_USER_IPv6?: any;
  CREATE_TIME?: Date;
}

export type tt_product_categoryPk = "PRODUCT_CATEGORY_ID";
export type tt_product_categoryId = tt_product_category[tt_product_categoryPk];
export type tt_product_categoryOptionalAttributes = "PRODUCT_CATEGORY_ID" | "PRODUCT_CATEGORY_NAME" | "PRODUCT_CATEGORY_PRIORITY" | "VISIBLE_TF" | "UPDATE_USER_ID" | "UPDATE_USER_IPv4" | "UPDATE_USER_IPv6" | "UPDATE_TIME" | "CREATE_USER_ID" | "CREATE_USER_IPv4" | "CREATE_USER_IPv6" | "CREATE_TIME";
export type tt_product_categoryCreationAttributes = Optional<tt_product_categoryAttributes, tt_product_categoryOptionalAttributes>;

export class tt_product_category extends Model<tt_product_categoryAttributes, tt_product_categoryCreationAttributes> implements tt_product_categoryAttributes {
  PRODUCT_CATEGORY_ID!: number;
  PRODUCT_CATEGORY_NAME?: string;
  PRODUCT_CATEGORY_PRIORITY?: number;
  VISIBLE_TF?: string;
  UPDATE_USER_ID?: number;
  UPDATE_USER_IPv4?: number;
  UPDATE_USER_IPv6?: any;
  UPDATE_TIME?: Date;
  CREATE_USER_ID?: number;
  CREATE_USER_IPv4?: number;
  CREATE_USER_IPv6?: any;
  CREATE_TIME?: Date;

  // tt_product_category hasMany tt_product via PRODUCT_CATEGORY_ID
  tt_products!: tt_product[];
  getTt_products!: Sequelize.HasManyGetAssociationsMixin<tt_product>;
  setTt_products!: Sequelize.HasManySetAssociationsMixin<tt_product, tt_productId>;
  addTt_product!: Sequelize.HasManyAddAssociationMixin<tt_product, tt_productId>;
  addTt_products!: Sequelize.HasManyAddAssociationsMixin<tt_product, tt_productId>;
  createTt_product!: Sequelize.HasManyCreateAssociationMixin<tt_product>;
  removeTt_product!: Sequelize.HasManyRemoveAssociationMixin<tt_product, tt_productId>;
  removeTt_products!: Sequelize.HasManyRemoveAssociationsMixin<tt_product, tt_productId>;
  hasTt_product!: Sequelize.HasManyHasAssociationMixin<tt_product, tt_productId>;
  hasTt_products!: Sequelize.HasManyHasAssociationsMixin<tt_product, tt_productId>;
  countTt_products!: Sequelize.HasManyCountAssociationsMixin;
  // tt_product_category belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_product_category belongsTo tt_user via CREATE_USER_ID
  CREATE_USER!: tt_user;
  getCREATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setCREATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createCREATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_product_category {
    return tt_product_category.init({
    PRODUCT_CATEGORY_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "상품 카테고리 ID"
    },
    PRODUCT_CATEGORY_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "카테고리명"
    },
    PRODUCT_CATEGORY_PRIORITY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "카테고리 우선순위"
    },
    VISIBLE_TF: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "카테고리 노출 여부"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
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
    },
    CREATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "생성 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    CREATE_USER_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "생성 사용자 IPv4"
    },
    CREATE_USER_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "생성 사용자 IPv6"
    },
    CREATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'tt_product_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PRODUCT_CATEGORY_ID" },
        ]
      },
      {
        name: "FK_tt_product_category_CREATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "CREATE_USER_ID" },
        ]
      },
      {
        name: "FK_tt_product_category_UPDATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
    ]
  });
  }
}
