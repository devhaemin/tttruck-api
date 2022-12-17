import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_file, tt_fileId } from './tt_file';
import type { tt_notice, tt_noticeId } from './tt_notice';
import type { tt_notice_image, tt_notice_imageId } from './tt_notice_image';
import type { tt_product_image, tt_product_imageId } from './tt_product_image';
import type { tt_view_log, tt_view_logId } from './tt_view_log';

export interface tt_contentAttributes {
  CONTENT_ID: number;
  CONTENT_TYPE?: string;
}

export type tt_contentPk = "CONTENT_ID";
export type tt_contentId = tt_content[tt_contentPk];
export type tt_contentOptionalAttributes = "CONTENT_ID" | "CONTENT_TYPE";
export type tt_contentCreationAttributes = Optional<tt_contentAttributes, tt_contentOptionalAttributes>;

export class tt_content extends Model<tt_contentAttributes, tt_contentCreationAttributes> implements tt_contentAttributes {
  CONTENT_ID!: number;
  CONTENT_TYPE?: string;

  // tt_content hasMany tt_file via CONTENT_ID
  tt_files!: tt_file[];
  getTt_files!: Sequelize.HasManyGetAssociationsMixin<tt_file>;
  setTt_files!: Sequelize.HasManySetAssociationsMixin<tt_file, tt_fileId>;
  addTt_file!: Sequelize.HasManyAddAssociationMixin<tt_file, tt_fileId>;
  addTt_files!: Sequelize.HasManyAddAssociationsMixin<tt_file, tt_fileId>;
  createTt_file!: Sequelize.HasManyCreateAssociationMixin<tt_file>;
  removeTt_file!: Sequelize.HasManyRemoveAssociationMixin<tt_file, tt_fileId>;
  removeTt_files!: Sequelize.HasManyRemoveAssociationsMixin<tt_file, tt_fileId>;
  hasTt_file!: Sequelize.HasManyHasAssociationMixin<tt_file, tt_fileId>;
  hasTt_files!: Sequelize.HasManyHasAssociationsMixin<tt_file, tt_fileId>;
  countTt_files!: Sequelize.HasManyCountAssociationsMixin;
  // tt_content hasMany tt_notice via CONTENT_ID
  tt_notices!: tt_notice[];
  getTt_notices!: Sequelize.HasManyGetAssociationsMixin<tt_notice>;
  setTt_notices!: Sequelize.HasManySetAssociationsMixin<tt_notice, tt_noticeId>;
  addTt_notice!: Sequelize.HasManyAddAssociationMixin<tt_notice, tt_noticeId>;
  addTt_notices!: Sequelize.HasManyAddAssociationsMixin<tt_notice, tt_noticeId>;
  createTt_notice!: Sequelize.HasManyCreateAssociationMixin<tt_notice>;
  removeTt_notice!: Sequelize.HasManyRemoveAssociationMixin<tt_notice, tt_noticeId>;
  removeTt_notices!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice, tt_noticeId>;
  hasTt_notice!: Sequelize.HasManyHasAssociationMixin<tt_notice, tt_noticeId>;
  hasTt_notices!: Sequelize.HasManyHasAssociationsMixin<tt_notice, tt_noticeId>;
  countTt_notices!: Sequelize.HasManyCountAssociationsMixin;
  // tt_content hasMany tt_notice_image via CONTENT_ID
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
  // tt_content hasMany tt_product_image via CONTENT_ID
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
  // tt_content hasMany tt_view_log via CONTENT_ID
  tt_view_logs!: tt_view_log[];
  getTt_view_logs!: Sequelize.HasManyGetAssociationsMixin<tt_view_log>;
  setTt_view_logs!: Sequelize.HasManySetAssociationsMixin<tt_view_log, tt_view_logId>;
  addTt_view_log!: Sequelize.HasManyAddAssociationMixin<tt_view_log, tt_view_logId>;
  addTt_view_logs!: Sequelize.HasManyAddAssociationsMixin<tt_view_log, tt_view_logId>;
  createTt_view_log!: Sequelize.HasManyCreateAssociationMixin<tt_view_log>;
  removeTt_view_log!: Sequelize.HasManyRemoveAssociationMixin<tt_view_log, tt_view_logId>;
  removeTt_view_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_view_log, tt_view_logId>;
  hasTt_view_log!: Sequelize.HasManyHasAssociationMixin<tt_view_log, tt_view_logId>;
  hasTt_view_logs!: Sequelize.HasManyHasAssociationsMixin<tt_view_log, tt_view_logId>;
  countTt_view_logs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_content {
    return tt_content.init({
    CONTENT_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "컨텐츠 ID"
    },
    CONTENT_TYPE: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "컨텐츠 타입"
    }
  }, {
    sequelize,
    tableName: 'tt_content',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CONTENT_ID" },
        ]
      },
    ]
  });
  }
}
