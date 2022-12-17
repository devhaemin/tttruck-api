import type { Sequelize } from "sequelize";
import { tt_access_log as _tt_access_log } from "./tt_access_log";
import type { tt_access_logAttributes, tt_access_logCreationAttributes } from "./tt_access_log";
import { tt_api_list as _tt_api_list } from "./tt_api_list";
import type { tt_api_listAttributes, tt_api_listCreationAttributes } from "./tt_api_list";
import { tt_authority as _tt_authority } from "./tt_authority";
import type { tt_authorityAttributes, tt_authorityCreationAttributes } from "./tt_authority";
import { tt_content as _tt_content } from "./tt_content";
import type { tt_contentAttributes, tt_contentCreationAttributes } from "./tt_content";
import { tt_file as _tt_file } from "./tt_file";
import type { tt_fileAttributes, tt_fileCreationAttributes } from "./tt_file";
import { tt_file_download_log as _tt_file_download_log } from "./tt_file_download_log";
import type { tt_file_download_logAttributes, tt_file_download_logCreationAttributes } from "./tt_file_download_log";
import { tt_login_log as _tt_login_log } from "./tt_login_log";
import type { tt_login_logAttributes, tt_login_logCreationAttributes } from "./tt_login_log";
import { tt_nickname_log as _tt_nickname_log } from "./tt_nickname_log";
import type { tt_nickname_logAttributes, tt_nickname_logCreationAttributes } from "./tt_nickname_log";
import { tt_notice as _tt_notice } from "./tt_notice";
import type { tt_noticeAttributes, tt_noticeCreationAttributes } from "./tt_notice";
import { tt_notice_image as _tt_notice_image } from "./tt_notice_image";
import type { tt_notice_imageAttributes, tt_notice_imageCreationAttributes } from "./tt_notice_image";
import { tt_notice_master as _tt_notice_master } from "./tt_notice_master";
import type { tt_notice_masterAttributes, tt_notice_masterCreationAttributes } from "./tt_notice_master";
import { tt_product as _tt_product } from "./tt_product";
import type { tt_productAttributes, tt_productCreationAttributes } from "./tt_product";
import { tt_product_image as _tt_product_image } from "./tt_product_image";
import type { tt_product_imageAttributes, tt_product_imageCreationAttributes } from "./tt_product_image";
import { tt_product_trade_log as _tt_product_trade_log } from "./tt_product_trade_log";
import type { tt_product_trade_logAttributes, tt_product_trade_logCreationAttributes } from "./tt_product_trade_log";
import { tt_product_update_log as _tt_product_update_log } from "./tt_product_update_log";
import type { tt_product_update_logAttributes, tt_product_update_logCreationAttributes } from "./tt_product_update_log";
import { tt_sns_auth as _tt_sns_auth } from "./tt_sns_auth";
import type { tt_sns_authAttributes, tt_sns_authCreationAttributes } from "./tt_sns_auth";
import { tt_user as _tt_user } from "./tt_user";
import type { tt_userAttributes, tt_userCreationAttributes } from "./tt_user";
import { tt_view_log as _tt_view_log } from "./tt_view_log";
import type { tt_view_logAttributes, tt_view_logCreationAttributes } from "./tt_view_log";

export {
  _tt_access_log as tt_access_log,
  _tt_api_list as tt_api_list,
  _tt_authority as tt_authority,
  _tt_content as tt_content,
  _tt_file as tt_file,
  _tt_file_download_log as tt_file_download_log,
  _tt_login_log as tt_login_log,
  _tt_nickname_log as tt_nickname_log,
  _tt_notice as tt_notice,
  _tt_notice_image as tt_notice_image,
  _tt_notice_master as tt_notice_master,
  _tt_product as tt_product,
  _tt_product_image as tt_product_image,
  _tt_product_trade_log as tt_product_trade_log,
  _tt_product_update_log as tt_product_update_log,
  _tt_sns_auth as tt_sns_auth,
  _tt_user as tt_user,
  _tt_view_log as tt_view_log,
};

export type {
  tt_access_logAttributes,
  tt_access_logCreationAttributes,
  tt_api_listAttributes,
  tt_api_listCreationAttributes,
  tt_authorityAttributes,
  tt_authorityCreationAttributes,
  tt_contentAttributes,
  tt_contentCreationAttributes,
  tt_fileAttributes,
  tt_fileCreationAttributes,
  tt_file_download_logAttributes,
  tt_file_download_logCreationAttributes,
  tt_login_logAttributes,
  tt_login_logCreationAttributes,
  tt_nickname_logAttributes,
  tt_nickname_logCreationAttributes,
  tt_noticeAttributes,
  tt_noticeCreationAttributes,
  tt_notice_imageAttributes,
  tt_notice_imageCreationAttributes,
  tt_notice_masterAttributes,
  tt_notice_masterCreationAttributes,
  tt_productAttributes,
  tt_productCreationAttributes,
  tt_product_imageAttributes,
  tt_product_imageCreationAttributes,
  tt_product_trade_logAttributes,
  tt_product_trade_logCreationAttributes,
  tt_product_update_logAttributes,
  tt_product_update_logCreationAttributes,
  tt_sns_authAttributes,
  tt_sns_authCreationAttributes,
  tt_userAttributes,
  tt_userCreationAttributes,
  tt_view_logAttributes,
  tt_view_logCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const tt_access_log = _tt_access_log.initModel(sequelize);
  const tt_api_list = _tt_api_list.initModel(sequelize);
  const tt_authority = _tt_authority.initModel(sequelize);
  const tt_content = _tt_content.initModel(sequelize);
  const tt_file = _tt_file.initModel(sequelize);
  const tt_file_download_log = _tt_file_download_log.initModel(sequelize);
  const tt_login_log = _tt_login_log.initModel(sequelize);
  const tt_nickname_log = _tt_nickname_log.initModel(sequelize);
  const tt_notice = _tt_notice.initModel(sequelize);
  const tt_notice_image = _tt_notice_image.initModel(sequelize);
  const tt_notice_master = _tt_notice_master.initModel(sequelize);
  const tt_product = _tt_product.initModel(sequelize);
  const tt_product_image = _tt_product_image.initModel(sequelize);
  const tt_product_trade_log = _tt_product_trade_log.initModel(sequelize);
  const tt_product_update_log = _tt_product_update_log.initModel(sequelize);
  const tt_sns_auth = _tt_sns_auth.initModel(sequelize);
  const tt_user = _tt_user.initModel(sequelize);
  const tt_view_log = _tt_view_log.initModel(sequelize);

  tt_access_log.belongsTo(tt_api_list, { as: "API", foreignKey: "API_ID"});
  tt_api_list.hasMany(tt_access_log, { as: "tt_access_logs", foreignKey: "API_ID"});
  tt_api_list.belongsTo(tt_authority, { as: "API_AUTHORITY", foreignKey: "API_AUTHORITY_ID"});
  tt_authority.hasMany(tt_api_list, { as: "tt_api_lists", foreignKey: "API_AUTHORITY_ID"});
  tt_file.belongsTo(tt_content, { as: "CONTENT", foreignKey: "CONTENT_ID"});
  tt_content.hasMany(tt_file, { as: "tt_files", foreignKey: "CONTENT_ID"});
  tt_notice.belongsTo(tt_content, { as: "CONTENT", foreignKey: "CONTENT_ID"});
  tt_content.hasMany(tt_notice, { as: "tt_notices", foreignKey: "CONTENT_ID"});
  tt_notice_image.belongsTo(tt_content, { as: "CONTENT", foreignKey: "CONTENT_ID"});
  tt_content.hasMany(tt_notice_image, { as: "tt_notice_images", foreignKey: "CONTENT_ID"});
  tt_product_image.belongsTo(tt_content, { as: "CONTENT", foreignKey: "CONTENT_ID"});
  tt_content.hasMany(tt_product_image, { as: "tt_product_images", foreignKey: "CONTENT_ID"});
  tt_view_log.belongsTo(tt_content, { as: "CONTENT", foreignKey: "CONTENT_ID"});
  tt_content.hasMany(tt_view_log, { as: "tt_view_logs", foreignKey: "CONTENT_ID"});
  tt_file_download_log.belongsTo(tt_file, { as: "FILE", foreignKey: "FILE_ID"});
  tt_file.hasMany(tt_file_download_log, { as: "tt_file_download_logs", foreignKey: "FILE_ID"});
  tt_notice_image.belongsTo(tt_file, { as: "FILE", foreignKey: "FILE_ID"});
  tt_file.hasMany(tt_notice_image, { as: "tt_notice_images", foreignKey: "FILE_ID"});
  tt_product_image.belongsTo(tt_file, { as: "FILE", foreignKey: "FILE_ID"});
  tt_file.hasMany(tt_product_image, { as: "tt_product_images", foreignKey: "FILE_ID"});
  tt_notice.belongsTo(tt_notice_master, { as: "NOTICE_MASTER", foreignKey: "NOTICE_MASTER_ID"});
  tt_notice_master.hasMany(tt_notice, { as: "tt_notices", foreignKey: "NOTICE_MASTER_ID"});
  tt_product_trade_log.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_product_trade_log, { as: "tt_product_trade_logs", foreignKey: "PRODUCT_ID"});
  tt_product_update_log.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_product_update_log, { as: "tt_product_update_logs", foreignKey: "PRODUCT_ID"});
  tt_product_image.belongsTo(tt_product_update_log, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product_update_log.hasMany(tt_product_image, { as: "tt_product_images", foreignKey: "PRODUCT_ID"});
  tt_access_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_access_log, { as: "tt_access_logs", foreignKey: "USER_ID"});
  tt_authority.belongsTo(tt_user, { as: "REG_USER", foreignKey: "REG_USER_ID"});
  tt_user.hasMany(tt_authority, { as: "tt_authorities", foreignKey: "REG_USER_ID"});
  tt_authority.belongsTo(tt_user, { as: "UPD_USER", foreignKey: "UPD_USER_ID"});
  tt_user.hasMany(tt_authority, { as: "UPD_USER_tt_authorities", foreignKey: "UPD_USER_ID"});
  tt_file_download_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_file_download_log, { as: "tt_file_download_logs", foreignKey: "USER_ID"});
  tt_login_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_login_log, { as: "tt_login_logs", foreignKey: "USER_ID"});
  tt_nickname_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_nickname_log, { as: "tt_nickname_logs", foreignKey: "USER_ID"});
  tt_notice.belongsTo(tt_user, { as: "POST_USER", foreignKey: "POST_USER_ID"});
  tt_user.hasMany(tt_notice, { as: "tt_notices", foreignKey: "POST_USER_ID"});
  tt_notice.belongsTo(tt_user, { as: "UPDATE_USER", foreignKey: "UPDATE_USER_ID"});
  tt_user.hasMany(tt_notice, { as: "UPDATE_USER_tt_notices", foreignKey: "UPDATE_USER_ID"});
  tt_notice_master.belongsTo(tt_user, { as: "CREATE_USER", foreignKey: "CREATE_USER_ID"});
  tt_user.hasMany(tt_notice_master, { as: "tt_notice_masters", foreignKey: "CREATE_USER_ID"});
  tt_notice_master.belongsTo(tt_user, { as: "UPDATE_USER", foreignKey: "UPDATE_USER_ID"});
  tt_user.hasMany(tt_notice_master, { as: "UPDATE_USER_tt_notice_masters", foreignKey: "UPDATE_USER_ID"});
  tt_product.belongsTo(tt_user, { as: "SELLER_USER", foreignKey: "SELLER_USER_ID"});
  tt_user.hasMany(tt_product, { as: "tt_products", foreignKey: "SELLER_USER_ID"});
  tt_product_trade_log.belongsTo(tt_user, { as: "SELLER_USER", foreignKey: "SELLER_USER_ID"});
  tt_user.hasMany(tt_product_trade_log, { as: "tt_product_trade_logs", foreignKey: "SELLER_USER_ID"});
  tt_product_trade_log.belongsTo(tt_user, { as: "BUYER_USER", foreignKey: "BUYER_USER_ID"});
  tt_user.hasMany(tt_product_trade_log, { as: "BUYER_USER_tt_product_trade_logs", foreignKey: "BUYER_USER_ID"});
  tt_sns_auth.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_sns_auth, { as: "tt_sns_auths", foreignKey: "USER_ID"});
  tt_user.belongsTo(tt_user, { as: "JOIN_PERMIT_USER", foreignKey: "JOIN_PERMIT_USER_ID"});
  tt_user.hasMany(tt_user, { as: "tt_users", foreignKey: "JOIN_PERMIT_USER_ID"});
  tt_view_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_view_log, { as: "tt_view_logs", foreignKey: "USER_ID"});

  return {
    tt_access_log: tt_access_log,
    tt_api_list: tt_api_list,
    tt_authority: tt_authority,
    tt_content: tt_content,
    tt_file: tt_file,
    tt_file_download_log: tt_file_download_log,
    tt_login_log: tt_login_log,
    tt_nickname_log: tt_nickname_log,
    tt_notice: tt_notice,
    tt_notice_image: tt_notice_image,
    tt_notice_master: tt_notice_master,
    tt_product: tt_product,
    tt_product_image: tt_product_image,
    tt_product_trade_log: tt_product_trade_log,
    tt_product_update_log: tt_product_update_log,
    tt_sns_auth: tt_sns_auth,
    tt_user: tt_user,
    tt_view_log: tt_view_log,
  };
}
