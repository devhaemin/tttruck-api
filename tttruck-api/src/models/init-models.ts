import type { Sequelize } from "sequelize";
import { tt_access_log as _tt_access_log } from "./tt_access_log";
import type { tt_access_logAttributes, tt_access_logCreationAttributes } from "./tt_access_log";
import { tt_alarm as _tt_alarm } from "./tt_alarm";
import type { tt_alarmAttributes, tt_alarmCreationAttributes } from "./tt_alarm";
import { tt_badge as _tt_badge } from "./tt_badge";
import type { tt_badgeAttributes, tt_badgeCreationAttributes } from "./tt_badge";
import { tt_badge_condition as _tt_badge_condition } from "./tt_badge_condition";
import type { tt_badge_conditionAttributes, tt_badge_conditionCreationAttributes } from "./tt_badge_condition";
import { tt_content as _tt_content } from "./tt_content";
import type { tt_contentAttributes, tt_contentCreationAttributes } from "./tt_content";
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
import { tt_phone_auth as _tt_phone_auth } from "./tt_phone_auth";
import type { tt_phone_authAttributes, tt_phone_authCreationAttributes } from "./tt_phone_auth";
import { tt_product as _tt_product } from "./tt_product";
import type { tt_productAttributes, tt_productCreationAttributes } from "./tt_product";
import { tt_product_category as _tt_product_category } from "./tt_product_category";
import type { tt_product_categoryAttributes, tt_product_categoryCreationAttributes } from "./tt_product_category";
import { tt_product_image as _tt_product_image } from "./tt_product_image";
import type { tt_product_imageAttributes, tt_product_imageCreationAttributes } from "./tt_product_image";
import { tt_sns_auth as _tt_sns_auth } from "./tt_sns_auth";
import type { tt_sns_authAttributes, tt_sns_authCreationAttributes } from "./tt_sns_auth";
import { tt_talkplus_channel as _tt_talkplus_channel } from "./tt_talkplus_channel";
import type { tt_talkplus_channelAttributes, tt_talkplus_channelCreationAttributes } from "./tt_talkplus_channel";
import { tt_talkplus_file as _tt_talkplus_file } from "./tt_talkplus_file";
import type { tt_talkplus_fileAttributes, tt_talkplus_fileCreationAttributes } from "./tt_talkplus_file";
import { tt_talkplus_message as _tt_talkplus_message } from "./tt_talkplus_message";
import type { tt_talkplus_messageAttributes, tt_talkplus_messageCreationAttributes } from "./tt_talkplus_message";
import { tt_trade_log as _tt_trade_log } from "./tt_trade_log";
import type { tt_trade_logAttributes, tt_trade_logCreationAttributes } from "./tt_trade_log";
import { tt_trade_review as _tt_trade_review } from "./tt_trade_review";
import type { tt_trade_reviewAttributes, tt_trade_reviewCreationAttributes } from "./tt_trade_review";
import { tt_user as _tt_user } from "./tt_user";
import type { tt_userAttributes, tt_userCreationAttributes } from "./tt_user";
import { tt_user_badge as _tt_user_badge } from "./tt_user_badge";
import type { tt_user_badgeAttributes, tt_user_badgeCreationAttributes } from "./tt_user_badge";
import { tt_user_signout as _tt_user_signout } from "./tt_user_signout";
import type { tt_user_signoutAttributes, tt_user_signoutCreationAttributes } from "./tt_user_signout";
import { tt_user_talkplus as _tt_user_talkplus } from "./tt_user_talkplus";
import type { tt_user_talkplusAttributes, tt_user_talkplusCreationAttributes } from "./tt_user_talkplus";
import { tt_view_log as _tt_view_log } from "./tt_view_log";
import type { tt_view_logAttributes, tt_view_logCreationAttributes } from "./tt_view_log";

export {
  _tt_access_log as tt_access_log,
  _tt_alarm as tt_alarm,
  _tt_badge as tt_badge,
  _tt_badge_condition as tt_badge_condition,
  _tt_content as tt_content,
  _tt_login_log as tt_login_log,
  _tt_nickname_log as tt_nickname_log,
  _tt_notice as tt_notice,
  _tt_notice_image as tt_notice_image,
  _tt_notice_master as tt_notice_master,
  _tt_phone_auth as tt_phone_auth,
  _tt_product as tt_product,
  _tt_product_category as tt_product_category,
  _tt_product_image as tt_product_image,
  _tt_sns_auth as tt_sns_auth,
  _tt_talkplus_channel as tt_talkplus_channel,
  _tt_talkplus_file as tt_talkplus_file,
  _tt_talkplus_message as tt_talkplus_message,
  _tt_trade_log as tt_trade_log,
  _tt_trade_review as tt_trade_review,
  _tt_user as tt_user,
  _tt_user_badge as tt_user_badge,
  _tt_user_signout as tt_user_signout,
  _tt_user_talkplus as tt_user_talkplus,
  _tt_view_log as tt_view_log,
};

export type {
  tt_access_logAttributes,
  tt_access_logCreationAttributes,
  tt_alarmAttributes,
  tt_alarmCreationAttributes,
  tt_badgeAttributes,
  tt_badgeCreationAttributes,
  tt_badge_conditionAttributes,
  tt_badge_conditionCreationAttributes,
  tt_contentAttributes,
  tt_contentCreationAttributes,
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
  tt_phone_authAttributes,
  tt_phone_authCreationAttributes,
  tt_productAttributes,
  tt_productCreationAttributes,
  tt_product_categoryAttributes,
  tt_product_categoryCreationAttributes,
  tt_product_imageAttributes,
  tt_product_imageCreationAttributes,
  tt_sns_authAttributes,
  tt_sns_authCreationAttributes,
  tt_talkplus_channelAttributes,
  tt_talkplus_channelCreationAttributes,
  tt_talkplus_fileAttributes,
  tt_talkplus_fileCreationAttributes,
  tt_talkplus_messageAttributes,
  tt_talkplus_messageCreationAttributes,
  tt_trade_logAttributes,
  tt_trade_logCreationAttributes,
  tt_trade_reviewAttributes,
  tt_trade_reviewCreationAttributes,
  tt_userAttributes,
  tt_userCreationAttributes,
  tt_user_badgeAttributes,
  tt_user_badgeCreationAttributes,
  tt_user_signoutAttributes,
  tt_user_signoutCreationAttributes,
  tt_user_talkplusAttributes,
  tt_user_talkplusCreationAttributes,
  tt_view_logAttributes,
  tt_view_logCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const tt_access_log = _tt_access_log.initModel(sequelize);
  const tt_alarm = _tt_alarm.initModel(sequelize);
  const tt_badge = _tt_badge.initModel(sequelize);
  const tt_badge_condition = _tt_badge_condition.initModel(sequelize);
  const tt_content = _tt_content.initModel(sequelize);
  const tt_login_log = _tt_login_log.initModel(sequelize);
  const tt_nickname_log = _tt_nickname_log.initModel(sequelize);
  const tt_notice = _tt_notice.initModel(sequelize);
  const tt_notice_image = _tt_notice_image.initModel(sequelize);
  const tt_notice_master = _tt_notice_master.initModel(sequelize);
  const tt_phone_auth = _tt_phone_auth.initModel(sequelize);
  const tt_product = _tt_product.initModel(sequelize);
  const tt_product_category = _tt_product_category.initModel(sequelize);
  const tt_product_image = _tt_product_image.initModel(sequelize);
  const tt_sns_auth = _tt_sns_auth.initModel(sequelize);
  const tt_talkplus_channel = _tt_talkplus_channel.initModel(sequelize);
  const tt_talkplus_file = _tt_talkplus_file.initModel(sequelize);
  const tt_talkplus_message = _tt_talkplus_message.initModel(sequelize);
  const tt_trade_log = _tt_trade_log.initModel(sequelize);
  const tt_trade_review = _tt_trade_review.initModel(sequelize);
  const tt_user = _tt_user.initModel(sequelize);
  const tt_user_badge = _tt_user_badge.initModel(sequelize);
  const tt_user_signout = _tt_user_signout.initModel(sequelize);
  const tt_user_talkplus = _tt_user_talkplus.initModel(sequelize);
  const tt_view_log = _tt_view_log.initModel(sequelize);

  tt_badge_condition.belongsTo(tt_badge, { as: "BADGE", foreignKey: "BADGE_ID"});
  tt_badge.hasMany(tt_badge_condition, { as: "tt_badge_conditions", foreignKey: "BADGE_ID"});
  tt_user_badge.belongsTo(tt_badge, { as: "BADGE", foreignKey: "BADGE_ID"});
  tt_badge.hasMany(tt_user_badge, { as: "tt_user_badges", foreignKey: "BADGE_ID"});
  tt_notice_image.belongsTo(tt_notice, { as: "NOTICE", foreignKey: "NOTICE_ID"});
  tt_notice.hasMany(tt_notice_image, { as: "tt_notice_images", foreignKey: "NOTICE_ID"});
  tt_notice.belongsTo(tt_notice_master, { as: "NOTICE_MASTER", foreignKey: "NOTICE_MASTER_ID"});
  tt_notice_master.hasMany(tt_notice, { as: "tt_notices", foreignKey: "NOTICE_MASTER_ID"});
  tt_product_image.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_product_image, { as: "tt_product_images", foreignKey: "PRODUCT_ID"});
  tt_talkplus_channel.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_talkplus_channel, { as: "tt_talkplus_channels", foreignKey: "PRODUCT_ID"});
  tt_trade_log.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_trade_log, { as: "tt_trade_logs", foreignKey: "PRODUCT_ID"});
  tt_trade_review.belongsTo(tt_product, { as: "PRODUCT", foreignKey: "PRODUCT_ID"});
  tt_product.hasMany(tt_trade_review, { as: "tt_trade_reviews", foreignKey: "PRODUCT_ID"});
  tt_badge_condition.belongsTo(tt_product_category, { as: "PRODUCT_CATEGORY", foreignKey: "PRODUCT_CATEGORY_ID"});
  tt_product_category.hasMany(tt_badge_condition, { as: "tt_badge_conditions", foreignKey: "PRODUCT_CATEGORY_ID"});
  tt_product.belongsTo(tt_product_category, { as: "PRODUCT_CATEGORY", foreignKey: "PRODUCT_CATEGORY_ID"});
  tt_product_category.hasMany(tt_product, { as: "tt_products", foreignKey: "PRODUCT_CATEGORY_ID"});
  tt_talkplus_message.belongsTo(tt_talkplus_channel, { as: "TALKPLUS_CHANNEL", foreignKey: "TALKPLUS_CHANNEL_ID"});
  tt_talkplus_channel.hasMany(tt_talkplus_message, { as: "tt_talkplus_messages", foreignKey: "TALKPLUS_CHANNEL_ID"});
  tt_talkplus_file.belongsTo(tt_talkplus_message, { as: "MESSAGE", foreignKey: "MESSAGE_ID"});
  tt_talkplus_message.hasMany(tt_talkplus_file, { as: "tt_talkplus_files", foreignKey: "MESSAGE_ID"});
  tt_access_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_access_log, { as: "tt_access_logs", foreignKey: "USER_ID"});
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
  tt_product.belongsTo(tt_user, { as: "BUYER_USER", foreignKey: "BUYER_USER_ID"});
  tt_user.hasMany(tt_product, { as: "BUYER_USER_tt_products", foreignKey: "BUYER_USER_ID"});
  tt_product_category.belongsTo(tt_user, { as: "UPDATE_USER", foreignKey: "UPDATE_USER_ID"});
  tt_user.hasMany(tt_product_category, { as: "tt_product_categories", foreignKey: "UPDATE_USER_ID"});
  tt_product_category.belongsTo(tt_user, { as: "CREATE_USER", foreignKey: "CREATE_USER_ID"});
  tt_user.hasMany(tt_product_category, { as: "CREATE_USER_tt_product_categories", foreignKey: "CREATE_USER_ID"});
  tt_sns_auth.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_sns_auth, { as: "tt_sns_auths", foreignKey: "USER_ID"});
  tt_talkplus_file.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_talkplus_file, { as: "tt_talkplus_files", foreignKey: "USER_ID"});
  tt_talkplus_message.belongsTo(tt_user, { as: "SEND_USER", foreignKey: "SEND_USER_ID"});
  tt_user.hasMany(tt_talkplus_message, { as: "tt_talkplus_messages", foreignKey: "SEND_USER_ID"});
  tt_trade_log.belongsTo(tt_user, { as: "SELLER_USER", foreignKey: "SELLER_USER_ID"});
  tt_user.hasMany(tt_trade_log, { as: "tt_trade_logs", foreignKey: "SELLER_USER_ID"});
  tt_trade_log.belongsTo(tt_user, { as: "BUYER_USER", foreignKey: "BUYER_USER_ID"});
  tt_user.hasMany(tt_trade_log, { as: "BUYER_USER_tt_trade_logs", foreignKey: "BUYER_USER_ID"});
  tt_trade_review.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_trade_review, { as: "tt_trade_reviews", foreignKey: "USER_ID"});
  tt_user.belongsTo(tt_user, { as: "JOIN_PERMIT_USER", foreignKey: "JOIN_PERMIT_USER_ID"});
  tt_user.hasMany(tt_user, { as: "tt_users", foreignKey: "JOIN_PERMIT_USER_ID"});
  tt_user_badge.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_user_badge, { as: "tt_user_badges", foreignKey: "USER_ID"});
  tt_user_signout.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_user_signout, { as: "tt_user_signouts", foreignKey: "USER_ID"});
  tt_user_talkplus.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasOne(tt_user_talkplus, { as: "tt_user_talkplu", foreignKey: "USER_ID"});
  tt_view_log.belongsTo(tt_user, { as: "USER", foreignKey: "USER_ID"});
  tt_user.hasMany(tt_view_log, { as: "tt_view_logs", foreignKey: "USER_ID"});
  tt_talkplus_channel.belongsTo(tt_user_talkplus, { as: "BUYER", foreignKey: "BUYER_ID"});
  tt_user_talkplus.hasMany(tt_talkplus_channel, { as: "tt_talkplus_channels", foreignKey: "BUYER_ID"});
  tt_talkplus_channel.belongsTo(tt_user_talkplus, { as: "SELLER", foreignKey: "SELLER_ID"});
  tt_user_talkplus.hasMany(tt_talkplus_channel, { as: "SELLER_tt_talkplus_channels", foreignKey: "SELLER_ID"});
  tt_talkplus_message.belongsTo(tt_user_talkplus, { as: "SEND_USER_TALKPLU", foreignKey: "SEND_USER_TALKPLUS_ID"});
  tt_user_talkplus.hasMany(tt_talkplus_message, { as: "tt_talkplus_messages", foreignKey: "SEND_USER_TALKPLUS_ID"});

  return {
    tt_access_log: tt_access_log,
    tt_alarm: tt_alarm,
    tt_badge: tt_badge,
    tt_badge_condition: tt_badge_condition,
    tt_content: tt_content,
    tt_login_log: tt_login_log,
    tt_nickname_log: tt_nickname_log,
    tt_notice: tt_notice,
    tt_notice_image: tt_notice_image,
    tt_notice_master: tt_notice_master,
    tt_phone_auth: tt_phone_auth,
    tt_product: tt_product,
    tt_product_category: tt_product_category,
    tt_product_image: tt_product_image,
    tt_sns_auth: tt_sns_auth,
    tt_talkplus_channel: tt_talkplus_channel,
    tt_talkplus_file: tt_talkplus_file,
    tt_talkplus_message: tt_talkplus_message,
    tt_trade_log: tt_trade_log,
    tt_trade_review: tt_trade_review,
    tt_user: tt_user,
    tt_user_badge: tt_user_badge,
    tt_user_signout: tt_user_signout,
    tt_user_talkplus: tt_user_talkplus,
    tt_view_log: tt_view_log,
  };
}
