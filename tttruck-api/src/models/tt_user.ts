import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_access_log, tt_access_logId } from './tt_access_log';
import type { tt_alarm, tt_alarmId } from './tt_alarm';
import type { tt_badge, tt_badgeId } from './tt_badge';
import type { tt_banner, tt_bannerId } from './tt_banner';
import type { tt_login_log, tt_login_logId } from './tt_login_log';
import type { tt_nickname_log, tt_nickname_logId } from './tt_nickname_log';
import type { tt_notice, tt_noticeId } from './tt_notice';
import type { tt_notice_master, tt_notice_masterId } from './tt_notice_master';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_product_category, tt_product_categoryId } from './tt_product_category';
import type { tt_search_log, tt_search_logId } from './tt_search_log';
import type { tt_sns_auth, tt_sns_authId } from './tt_sns_auth';
import type { tt_talkplus_file, tt_talkplus_fileId } from './tt_talkplus_file';
import type { tt_talkplus_message, tt_talkplus_messageId } from './tt_talkplus_message';
import type { tt_trade_log, tt_trade_logId } from './tt_trade_log';
import type { tt_trade_review, tt_trade_reviewId } from './tt_trade_review';
import type { tt_trucker_center, tt_trucker_centerId } from './tt_trucker_center';
import type { tt_trucker_center_master, tt_trucker_center_masterId } from './tt_trucker_center_master';
import type { tt_user_badge, tt_user_badgeId } from './tt_user_badge';
import type { tt_user_signout, tt_user_signoutId } from './tt_user_signout';
import type { tt_user_talkplus, tt_user_talkplusCreationAttributes, tt_user_talkplusId } from './tt_user_talkplus';
import type { tt_view_log, tt_view_logId } from './tt_view_log';

export interface tt_userAttributes {
  USER_ID: number;
  PHONE: string;
  PASSWORD: string;
  NICKNAME?: string;
  NAME?: string;
  ACCESSTOKEN: string;
  FCMTOKEN?: string;
  BUYING_SAVINGS: number;
  SELLING_SAVINGS: number;
  WASTE_SAVINGS: number;
  GREENGAS_SAVINGS?: number;
  COST_SAVINGS?: number;
  GROUP: number;
  PROFILE_IMAGE?: string;
  INTERIOR_COMPANY_TF: number;
  INTERIOR_COMPANY_NAME?: string;
  BIRTHDAY?: string;
  GENDER?: number;
  ZIP_CODE?: string;
  ADDRESS?: string;
  DETAIL_ADDRESS?: string;
  JOIN_STATE?: string;
  RESTING_TF: number;
  LEAVE_TF: number;
  PHONE_AUTH_CODE?: string;
  PHONE_AUTH_DATE?: Date;
  PHONE_AUTH_SUCCEED_DATE?: Date;
  PHONE_AUTH_TF: number;
  REG_TIME?: Date;
  UPD_TIME?: Date;
  JOIN_TIME?: Date;
  JOIN_PERMIT_USER_ID?: number;
  JOIN_AGREE: string;
  AGREE_UPD_TIME: Date;
  ACCESS_TIME: Date;
}

export type tt_userPk = "USER_ID";
export type tt_userId = tt_user[tt_userPk];
export type tt_userOptionalAttributes = "USER_ID" | "NICKNAME" | "NAME" | "FCMTOKEN" | "BUYING_SAVINGS" | "SELLING_SAVINGS" | "WASTE_SAVINGS" | "GREENGAS_SAVINGS" | "COST_SAVINGS" | "PROFILE_IMAGE" | "INTERIOR_COMPANY_TF" | "INTERIOR_COMPANY_NAME" | "BIRTHDAY" | "GENDER" | "ZIP_CODE" | "ADDRESS" | "DETAIL_ADDRESS" | "JOIN_STATE" | "RESTING_TF" | "LEAVE_TF" | "PHONE_AUTH_CODE" | "PHONE_AUTH_DATE" | "PHONE_AUTH_SUCCEED_DATE" | "PHONE_AUTH_TF" | "REG_TIME" | "UPD_TIME" | "JOIN_TIME" | "JOIN_PERMIT_USER_ID" | "JOIN_AGREE" | "AGREE_UPD_TIME" | "ACCESS_TIME";
export type tt_userCreationAttributes = Optional<tt_userAttributes, tt_userOptionalAttributes>;

export class tt_user extends Model<tt_userAttributes, tt_userCreationAttributes> implements tt_userAttributes {
  USER_ID!: number;
  PHONE!: string;
  PASSWORD!: string;
  NICKNAME?: string;
  NAME?: string;
  ACCESSTOKEN!: string;
  FCMTOKEN?: string;
  BUYING_SAVINGS!: number;
  SELLING_SAVINGS!: number;
  WASTE_SAVINGS!: number;
  GREENGAS_SAVINGS?: number;
  COST_SAVINGS?: number;
  GROUP!: number;
  PROFILE_IMAGE?: string;
  INTERIOR_COMPANY_TF!: number;
  INTERIOR_COMPANY_NAME?: string;
  BIRTHDAY?: string;
  GENDER?: number;
  ZIP_CODE?: string;
  ADDRESS?: string;
  DETAIL_ADDRESS?: string;
  JOIN_STATE?: string;
  RESTING_TF!: number;
  LEAVE_TF!: number;
  PHONE_AUTH_CODE?: string;
  PHONE_AUTH_DATE?: Date;
  PHONE_AUTH_SUCCEED_DATE?: Date;
  PHONE_AUTH_TF!: number;
  REG_TIME?: Date;
  UPD_TIME?: Date;
  JOIN_TIME?: Date;
  JOIN_PERMIT_USER_ID?: number;
  JOIN_AGREE!: string;
  AGREE_UPD_TIME!: Date;
  ACCESS_TIME!: Date;

  // tt_user hasMany tt_access_log via USER_ID
  tt_access_logs!: tt_access_log[];
  getTt_access_logs!: Sequelize.HasManyGetAssociationsMixin<tt_access_log>;
  setTt_access_logs!: Sequelize.HasManySetAssociationsMixin<tt_access_log, tt_access_logId>;
  addTt_access_log!: Sequelize.HasManyAddAssociationMixin<tt_access_log, tt_access_logId>;
  addTt_access_logs!: Sequelize.HasManyAddAssociationsMixin<tt_access_log, tt_access_logId>;
  createTt_access_log!: Sequelize.HasManyCreateAssociationMixin<tt_access_log>;
  removeTt_access_log!: Sequelize.HasManyRemoveAssociationMixin<tt_access_log, tt_access_logId>;
  removeTt_access_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_access_log, tt_access_logId>;
  hasTt_access_log!: Sequelize.HasManyHasAssociationMixin<tt_access_log, tt_access_logId>;
  hasTt_access_logs!: Sequelize.HasManyHasAssociationsMixin<tt_access_log, tt_access_logId>;
  countTt_access_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_alarm via USER_ID
  tt_alarms!: tt_alarm[];
  getTt_alarms!: Sequelize.HasManyGetAssociationsMixin<tt_alarm>;
  setTt_alarms!: Sequelize.HasManySetAssociationsMixin<tt_alarm, tt_alarmId>;
  addTt_alarm!: Sequelize.HasManyAddAssociationMixin<tt_alarm, tt_alarmId>;
  addTt_alarms!: Sequelize.HasManyAddAssociationsMixin<tt_alarm, tt_alarmId>;
  createTt_alarm!: Sequelize.HasManyCreateAssociationMixin<tt_alarm>;
  removeTt_alarm!: Sequelize.HasManyRemoveAssociationMixin<tt_alarm, tt_alarmId>;
  removeTt_alarms!: Sequelize.HasManyRemoveAssociationsMixin<tt_alarm, tt_alarmId>;
  hasTt_alarm!: Sequelize.HasManyHasAssociationMixin<tt_alarm, tt_alarmId>;
  hasTt_alarms!: Sequelize.HasManyHasAssociationsMixin<tt_alarm, tt_alarmId>;
  countTt_alarms!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_badge via UPDATE_USER_ID
  tt_badges!: tt_badge[];
  getTt_badges!: Sequelize.HasManyGetAssociationsMixin<tt_badge>;
  setTt_badges!: Sequelize.HasManySetAssociationsMixin<tt_badge, tt_badgeId>;
  addTt_badge!: Sequelize.HasManyAddAssociationMixin<tt_badge, tt_badgeId>;
  addTt_badges!: Sequelize.HasManyAddAssociationsMixin<tt_badge, tt_badgeId>;
  createTt_badge!: Sequelize.HasManyCreateAssociationMixin<tt_badge>;
  removeTt_badge!: Sequelize.HasManyRemoveAssociationMixin<tt_badge, tt_badgeId>;
  removeTt_badges!: Sequelize.HasManyRemoveAssociationsMixin<tt_badge, tt_badgeId>;
  hasTt_badge!: Sequelize.HasManyHasAssociationMixin<tt_badge, tt_badgeId>;
  hasTt_badges!: Sequelize.HasManyHasAssociationsMixin<tt_badge, tt_badgeId>;
  countTt_badges!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_banner via UPDATE_USER_ID
  tt_banners!: tt_banner[];
  getTt_banners!: Sequelize.HasManyGetAssociationsMixin<tt_banner>;
  setTt_banners!: Sequelize.HasManySetAssociationsMixin<tt_banner, tt_bannerId>;
  addTt_banner!: Sequelize.HasManyAddAssociationMixin<tt_banner, tt_bannerId>;
  addTt_banners!: Sequelize.HasManyAddAssociationsMixin<tt_banner, tt_bannerId>;
  createTt_banner!: Sequelize.HasManyCreateAssociationMixin<tt_banner>;
  removeTt_banner!: Sequelize.HasManyRemoveAssociationMixin<tt_banner, tt_bannerId>;
  removeTt_banners!: Sequelize.HasManyRemoveAssociationsMixin<tt_banner, tt_bannerId>;
  hasTt_banner!: Sequelize.HasManyHasAssociationMixin<tt_banner, tt_bannerId>;
  hasTt_banners!: Sequelize.HasManyHasAssociationsMixin<tt_banner, tt_bannerId>;
  countTt_banners!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_banner via POST_USER_ID
  POST_USER_tt_banners!: tt_banner[];
  getPOST_USER_tt_banners!: Sequelize.HasManyGetAssociationsMixin<tt_banner>;
  setPOST_USER_tt_banners!: Sequelize.HasManySetAssociationsMixin<tt_banner, tt_bannerId>;
  addPOST_USER_tt_banner!: Sequelize.HasManyAddAssociationMixin<tt_banner, tt_bannerId>;
  addPOST_USER_tt_banners!: Sequelize.HasManyAddAssociationsMixin<tt_banner, tt_bannerId>;
  createPOST_USER_tt_banner!: Sequelize.HasManyCreateAssociationMixin<tt_banner>;
  removePOST_USER_tt_banner!: Sequelize.HasManyRemoveAssociationMixin<tt_banner, tt_bannerId>;
  removePOST_USER_tt_banners!: Sequelize.HasManyRemoveAssociationsMixin<tt_banner, tt_bannerId>;
  hasPOST_USER_tt_banner!: Sequelize.HasManyHasAssociationMixin<tt_banner, tt_bannerId>;
  hasPOST_USER_tt_banners!: Sequelize.HasManyHasAssociationsMixin<tt_banner, tt_bannerId>;
  countPOST_USER_tt_banners!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_login_log via USER_ID
  tt_login_logs!: tt_login_log[];
  getTt_login_logs!: Sequelize.HasManyGetAssociationsMixin<tt_login_log>;
  setTt_login_logs!: Sequelize.HasManySetAssociationsMixin<tt_login_log, tt_login_logId>;
  addTt_login_log!: Sequelize.HasManyAddAssociationMixin<tt_login_log, tt_login_logId>;
  addTt_login_logs!: Sequelize.HasManyAddAssociationsMixin<tt_login_log, tt_login_logId>;
  createTt_login_log!: Sequelize.HasManyCreateAssociationMixin<tt_login_log>;
  removeTt_login_log!: Sequelize.HasManyRemoveAssociationMixin<tt_login_log, tt_login_logId>;
  removeTt_login_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_login_log, tt_login_logId>;
  hasTt_login_log!: Sequelize.HasManyHasAssociationMixin<tt_login_log, tt_login_logId>;
  hasTt_login_logs!: Sequelize.HasManyHasAssociationsMixin<tt_login_log, tt_login_logId>;
  countTt_login_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_nickname_log via USER_ID
  tt_nickname_logs!: tt_nickname_log[];
  getTt_nickname_logs!: Sequelize.HasManyGetAssociationsMixin<tt_nickname_log>;
  setTt_nickname_logs!: Sequelize.HasManySetAssociationsMixin<tt_nickname_log, tt_nickname_logId>;
  addTt_nickname_log!: Sequelize.HasManyAddAssociationMixin<tt_nickname_log, tt_nickname_logId>;
  addTt_nickname_logs!: Sequelize.HasManyAddAssociationsMixin<tt_nickname_log, tt_nickname_logId>;
  createTt_nickname_log!: Sequelize.HasManyCreateAssociationMixin<tt_nickname_log>;
  removeTt_nickname_log!: Sequelize.HasManyRemoveAssociationMixin<tt_nickname_log, tt_nickname_logId>;
  removeTt_nickname_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_nickname_log, tt_nickname_logId>;
  hasTt_nickname_log!: Sequelize.HasManyHasAssociationMixin<tt_nickname_log, tt_nickname_logId>;
  hasTt_nickname_logs!: Sequelize.HasManyHasAssociationsMixin<tt_nickname_log, tt_nickname_logId>;
  countTt_nickname_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_notice via POST_USER_ID
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
  // tt_user hasMany tt_notice via UPDATE_USER_ID
  UPDATE_USER_tt_notices!: tt_notice[];
  getUPDATE_USER_tt_notices!: Sequelize.HasManyGetAssociationsMixin<tt_notice>;
  setUPDATE_USER_tt_notices!: Sequelize.HasManySetAssociationsMixin<tt_notice, tt_noticeId>;
  addUPDATE_USER_tt_notice!: Sequelize.HasManyAddAssociationMixin<tt_notice, tt_noticeId>;
  addUPDATE_USER_tt_notices!: Sequelize.HasManyAddAssociationsMixin<tt_notice, tt_noticeId>;
  createUPDATE_USER_tt_notice!: Sequelize.HasManyCreateAssociationMixin<tt_notice>;
  removeUPDATE_USER_tt_notice!: Sequelize.HasManyRemoveAssociationMixin<tt_notice, tt_noticeId>;
  removeUPDATE_USER_tt_notices!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice, tt_noticeId>;
  hasUPDATE_USER_tt_notice!: Sequelize.HasManyHasAssociationMixin<tt_notice, tt_noticeId>;
  hasUPDATE_USER_tt_notices!: Sequelize.HasManyHasAssociationsMixin<tt_notice, tt_noticeId>;
  countUPDATE_USER_tt_notices!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_notice_master via CREATE_USER_ID
  tt_notice_masters!: tt_notice_master[];
  getTt_notice_masters!: Sequelize.HasManyGetAssociationsMixin<tt_notice_master>;
  setTt_notice_masters!: Sequelize.HasManySetAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  addTt_notice_master!: Sequelize.HasManyAddAssociationMixin<tt_notice_master, tt_notice_masterId>;
  addTt_notice_masters!: Sequelize.HasManyAddAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  createTt_notice_master!: Sequelize.HasManyCreateAssociationMixin<tt_notice_master>;
  removeTt_notice_master!: Sequelize.HasManyRemoveAssociationMixin<tt_notice_master, tt_notice_masterId>;
  removeTt_notice_masters!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  hasTt_notice_master!: Sequelize.HasManyHasAssociationMixin<tt_notice_master, tt_notice_masterId>;
  hasTt_notice_masters!: Sequelize.HasManyHasAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  countTt_notice_masters!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_notice_master via UPDATE_USER_ID
  UPDATE_USER_tt_notice_masters!: tt_notice_master[];
  getUPDATE_USER_tt_notice_masters!: Sequelize.HasManyGetAssociationsMixin<tt_notice_master>;
  setUPDATE_USER_tt_notice_masters!: Sequelize.HasManySetAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  addUPDATE_USER_tt_notice_master!: Sequelize.HasManyAddAssociationMixin<tt_notice_master, tt_notice_masterId>;
  addUPDATE_USER_tt_notice_masters!: Sequelize.HasManyAddAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  createUPDATE_USER_tt_notice_master!: Sequelize.HasManyCreateAssociationMixin<tt_notice_master>;
  removeUPDATE_USER_tt_notice_master!: Sequelize.HasManyRemoveAssociationMixin<tt_notice_master, tt_notice_masterId>;
  removeUPDATE_USER_tt_notice_masters!: Sequelize.HasManyRemoveAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  hasUPDATE_USER_tt_notice_master!: Sequelize.HasManyHasAssociationMixin<tt_notice_master, tt_notice_masterId>;
  hasUPDATE_USER_tt_notice_masters!: Sequelize.HasManyHasAssociationsMixin<tt_notice_master, tt_notice_masterId>;
  countUPDATE_USER_tt_notice_masters!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_product via SELLER_USER_ID
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
  // tt_user hasMany tt_product via BUYER_USER_ID
  BUYER_USER_tt_products!: tt_product[];
  getBUYER_USER_tt_products!: Sequelize.HasManyGetAssociationsMixin<tt_product>;
  setBUYER_USER_tt_products!: Sequelize.HasManySetAssociationsMixin<tt_product, tt_productId>;
  addBUYER_USER_tt_product!: Sequelize.HasManyAddAssociationMixin<tt_product, tt_productId>;
  addBUYER_USER_tt_products!: Sequelize.HasManyAddAssociationsMixin<tt_product, tt_productId>;
  createBUYER_USER_tt_product!: Sequelize.HasManyCreateAssociationMixin<tt_product>;
  removeBUYER_USER_tt_product!: Sequelize.HasManyRemoveAssociationMixin<tt_product, tt_productId>;
  removeBUYER_USER_tt_products!: Sequelize.HasManyRemoveAssociationsMixin<tt_product, tt_productId>;
  hasBUYER_USER_tt_product!: Sequelize.HasManyHasAssociationMixin<tt_product, tt_productId>;
  hasBUYER_USER_tt_products!: Sequelize.HasManyHasAssociationsMixin<tt_product, tt_productId>;
  countBUYER_USER_tt_products!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_product_category via UPDATE_USER_ID
  tt_product_categories!: tt_product_category[];
  getTt_product_categories!: Sequelize.HasManyGetAssociationsMixin<tt_product_category>;
  setTt_product_categories!: Sequelize.HasManySetAssociationsMixin<tt_product_category, tt_product_categoryId>;
  addTt_product_category!: Sequelize.HasManyAddAssociationMixin<tt_product_category, tt_product_categoryId>;
  addTt_product_categories!: Sequelize.HasManyAddAssociationsMixin<tt_product_category, tt_product_categoryId>;
  createTt_product_category!: Sequelize.HasManyCreateAssociationMixin<tt_product_category>;
  removeTt_product_category!: Sequelize.HasManyRemoveAssociationMixin<tt_product_category, tt_product_categoryId>;
  removeTt_product_categories!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_category, tt_product_categoryId>;
  hasTt_product_category!: Sequelize.HasManyHasAssociationMixin<tt_product_category, tt_product_categoryId>;
  hasTt_product_categories!: Sequelize.HasManyHasAssociationsMixin<tt_product_category, tt_product_categoryId>;
  countTt_product_categories!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_product_category via CREATE_USER_ID
  CREATE_USER_tt_product_categories!: tt_product_category[];
  getCREATE_USER_tt_product_categories!: Sequelize.HasManyGetAssociationsMixin<tt_product_category>;
  setCREATE_USER_tt_product_categories!: Sequelize.HasManySetAssociationsMixin<tt_product_category, tt_product_categoryId>;
  addCREATE_USER_tt_product_category!: Sequelize.HasManyAddAssociationMixin<tt_product_category, tt_product_categoryId>;
  addCREATE_USER_tt_product_categories!: Sequelize.HasManyAddAssociationsMixin<tt_product_category, tt_product_categoryId>;
  createCREATE_USER_tt_product_category!: Sequelize.HasManyCreateAssociationMixin<tt_product_category>;
  removeCREATE_USER_tt_product_category!: Sequelize.HasManyRemoveAssociationMixin<tt_product_category, tt_product_categoryId>;
  removeCREATE_USER_tt_product_categories!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_category, tt_product_categoryId>;
  hasCREATE_USER_tt_product_category!: Sequelize.HasManyHasAssociationMixin<tt_product_category, tt_product_categoryId>;
  hasCREATE_USER_tt_product_categories!: Sequelize.HasManyHasAssociationsMixin<tt_product_category, tt_product_categoryId>;
  countCREATE_USER_tt_product_categories!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_search_log via USER_ID
  tt_search_logs!: tt_search_log[];
  getTt_search_logs!: Sequelize.HasManyGetAssociationsMixin<tt_search_log>;
  setTt_search_logs!: Sequelize.HasManySetAssociationsMixin<tt_search_log, tt_search_logId>;
  addTt_search_log!: Sequelize.HasManyAddAssociationMixin<tt_search_log, tt_search_logId>;
  addTt_search_logs!: Sequelize.HasManyAddAssociationsMixin<tt_search_log, tt_search_logId>;
  createTt_search_log!: Sequelize.HasManyCreateAssociationMixin<tt_search_log>;
  removeTt_search_log!: Sequelize.HasManyRemoveAssociationMixin<tt_search_log, tt_search_logId>;
  removeTt_search_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_search_log, tt_search_logId>;
  hasTt_search_log!: Sequelize.HasManyHasAssociationMixin<tt_search_log, tt_search_logId>;
  hasTt_search_logs!: Sequelize.HasManyHasAssociationsMixin<tt_search_log, tt_search_logId>;
  countTt_search_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_sns_auth via USER_ID
  tt_sns_auths!: tt_sns_auth[];
  getTt_sns_auths!: Sequelize.HasManyGetAssociationsMixin<tt_sns_auth>;
  setTt_sns_auths!: Sequelize.HasManySetAssociationsMixin<tt_sns_auth, tt_sns_authId>;
  addTt_sns_auth!: Sequelize.HasManyAddAssociationMixin<tt_sns_auth, tt_sns_authId>;
  addTt_sns_auths!: Sequelize.HasManyAddAssociationsMixin<tt_sns_auth, tt_sns_authId>;
  createTt_sns_auth!: Sequelize.HasManyCreateAssociationMixin<tt_sns_auth>;
  removeTt_sns_auth!: Sequelize.HasManyRemoveAssociationMixin<tt_sns_auth, tt_sns_authId>;
  removeTt_sns_auths!: Sequelize.HasManyRemoveAssociationsMixin<tt_sns_auth, tt_sns_authId>;
  hasTt_sns_auth!: Sequelize.HasManyHasAssociationMixin<tt_sns_auth, tt_sns_authId>;
  hasTt_sns_auths!: Sequelize.HasManyHasAssociationsMixin<tt_sns_auth, tt_sns_authId>;
  countTt_sns_auths!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_talkplus_file via USER_ID
  tt_talkplus_files!: tt_talkplus_file[];
  getTt_talkplus_files!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_file>;
  setTt_talkplus_files!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  addTt_talkplus_file!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  addTt_talkplus_files!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  createTt_talkplus_file!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_file>;
  removeTt_talkplus_file!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  removeTt_talkplus_files!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  hasTt_talkplus_file!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_file, tt_talkplus_fileId>;
  hasTt_talkplus_files!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_file, tt_talkplus_fileId>;
  countTt_talkplus_files!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_talkplus_message via SEND_USER_ID
  tt_talkplus_messages!: tt_talkplus_message[];
  getTt_talkplus_messages!: Sequelize.HasManyGetAssociationsMixin<tt_talkplus_message>;
  setTt_talkplus_messages!: Sequelize.HasManySetAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  addTt_talkplus_message!: Sequelize.HasManyAddAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  addTt_talkplus_messages!: Sequelize.HasManyAddAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  createTt_talkplus_message!: Sequelize.HasManyCreateAssociationMixin<tt_talkplus_message>;
  removeTt_talkplus_message!: Sequelize.HasManyRemoveAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  removeTt_talkplus_messages!: Sequelize.HasManyRemoveAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  hasTt_talkplus_message!: Sequelize.HasManyHasAssociationMixin<tt_talkplus_message, tt_talkplus_messageId>;
  hasTt_talkplus_messages!: Sequelize.HasManyHasAssociationsMixin<tt_talkplus_message, tt_talkplus_messageId>;
  countTt_talkplus_messages!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trade_log via SELLER_USER_ID
  tt_trade_logs!: tt_trade_log[];
  getTt_trade_logs!: Sequelize.HasManyGetAssociationsMixin<tt_trade_log>;
  setTt_trade_logs!: Sequelize.HasManySetAssociationsMixin<tt_trade_log, tt_trade_logId>;
  addTt_trade_log!: Sequelize.HasManyAddAssociationMixin<tt_trade_log, tt_trade_logId>;
  addTt_trade_logs!: Sequelize.HasManyAddAssociationsMixin<tt_trade_log, tt_trade_logId>;
  createTt_trade_log!: Sequelize.HasManyCreateAssociationMixin<tt_trade_log>;
  removeTt_trade_log!: Sequelize.HasManyRemoveAssociationMixin<tt_trade_log, tt_trade_logId>;
  removeTt_trade_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_trade_log, tt_trade_logId>;
  hasTt_trade_log!: Sequelize.HasManyHasAssociationMixin<tt_trade_log, tt_trade_logId>;
  hasTt_trade_logs!: Sequelize.HasManyHasAssociationsMixin<tt_trade_log, tt_trade_logId>;
  countTt_trade_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trade_log via BUYER_USER_ID
  BUYER_USER_tt_trade_logs!: tt_trade_log[];
  getBUYER_USER_tt_trade_logs!: Sequelize.HasManyGetAssociationsMixin<tt_trade_log>;
  setBUYER_USER_tt_trade_logs!: Sequelize.HasManySetAssociationsMixin<tt_trade_log, tt_trade_logId>;
  addBUYER_USER_tt_trade_log!: Sequelize.HasManyAddAssociationMixin<tt_trade_log, tt_trade_logId>;
  addBUYER_USER_tt_trade_logs!: Sequelize.HasManyAddAssociationsMixin<tt_trade_log, tt_trade_logId>;
  createBUYER_USER_tt_trade_log!: Sequelize.HasManyCreateAssociationMixin<tt_trade_log>;
  removeBUYER_USER_tt_trade_log!: Sequelize.HasManyRemoveAssociationMixin<tt_trade_log, tt_trade_logId>;
  removeBUYER_USER_tt_trade_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_trade_log, tt_trade_logId>;
  hasBUYER_USER_tt_trade_log!: Sequelize.HasManyHasAssociationMixin<tt_trade_log, tt_trade_logId>;
  hasBUYER_USER_tt_trade_logs!: Sequelize.HasManyHasAssociationsMixin<tt_trade_log, tt_trade_logId>;
  countBUYER_USER_tt_trade_logs!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trade_review via USER_ID
  tt_trade_reviews!: tt_trade_review[];
  getTt_trade_reviews!: Sequelize.HasManyGetAssociationsMixin<tt_trade_review>;
  setTt_trade_reviews!: Sequelize.HasManySetAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  addTt_trade_review!: Sequelize.HasManyAddAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  addTt_trade_reviews!: Sequelize.HasManyAddAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  createTt_trade_review!: Sequelize.HasManyCreateAssociationMixin<tt_trade_review>;
  removeTt_trade_review!: Sequelize.HasManyRemoveAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  removeTt_trade_reviews!: Sequelize.HasManyRemoveAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  hasTt_trade_review!: Sequelize.HasManyHasAssociationMixin<tt_trade_review, tt_trade_reviewId>;
  hasTt_trade_reviews!: Sequelize.HasManyHasAssociationsMixin<tt_trade_review, tt_trade_reviewId>;
  countTt_trade_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trucker_center via POST_USER_ID
  tt_trucker_centers!: tt_trucker_center[];
  getTt_trucker_centers!: Sequelize.HasManyGetAssociationsMixin<tt_trucker_center>;
  setTt_trucker_centers!: Sequelize.HasManySetAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  addTt_trucker_center!: Sequelize.HasManyAddAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  addTt_trucker_centers!: Sequelize.HasManyAddAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  createTt_trucker_center!: Sequelize.HasManyCreateAssociationMixin<tt_trucker_center>;
  removeTt_trucker_center!: Sequelize.HasManyRemoveAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  removeTt_trucker_centers!: Sequelize.HasManyRemoveAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  hasTt_trucker_center!: Sequelize.HasManyHasAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  hasTt_trucker_centers!: Sequelize.HasManyHasAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  countTt_trucker_centers!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trucker_center via UPDATE_USER_ID
  UPDATE_USER_tt_trucker_centers!: tt_trucker_center[];
  getUPDATE_USER_tt_trucker_centers!: Sequelize.HasManyGetAssociationsMixin<tt_trucker_center>;
  setUPDATE_USER_tt_trucker_centers!: Sequelize.HasManySetAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  addUPDATE_USER_tt_trucker_center!: Sequelize.HasManyAddAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  addUPDATE_USER_tt_trucker_centers!: Sequelize.HasManyAddAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  createUPDATE_USER_tt_trucker_center!: Sequelize.HasManyCreateAssociationMixin<tt_trucker_center>;
  removeUPDATE_USER_tt_trucker_center!: Sequelize.HasManyRemoveAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  removeUPDATE_USER_tt_trucker_centers!: Sequelize.HasManyRemoveAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  hasUPDATE_USER_tt_trucker_center!: Sequelize.HasManyHasAssociationMixin<tt_trucker_center, tt_trucker_centerId>;
  hasUPDATE_USER_tt_trucker_centers!: Sequelize.HasManyHasAssociationsMixin<tt_trucker_center, tt_trucker_centerId>;
  countUPDATE_USER_tt_trucker_centers!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trucker_center_master via CREATE_USER_ID
  tt_trucker_center_masters!: tt_trucker_center_master[];
  getTt_trucker_center_masters!: Sequelize.HasManyGetAssociationsMixin<tt_trucker_center_master>;
  setTt_trucker_center_masters!: Sequelize.HasManySetAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  addTt_trucker_center_master!: Sequelize.HasManyAddAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  addTt_trucker_center_masters!: Sequelize.HasManyAddAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  createTt_trucker_center_master!: Sequelize.HasManyCreateAssociationMixin<tt_trucker_center_master>;
  removeTt_trucker_center_master!: Sequelize.HasManyRemoveAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  removeTt_trucker_center_masters!: Sequelize.HasManyRemoveAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  hasTt_trucker_center_master!: Sequelize.HasManyHasAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  hasTt_trucker_center_masters!: Sequelize.HasManyHasAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  countTt_trucker_center_masters!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_trucker_center_master via UPDATE_USER_ID
  UPDATE_USER_tt_trucker_center_masters!: tt_trucker_center_master[];
  getUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManyGetAssociationsMixin<tt_trucker_center_master>;
  setUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManySetAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  addUPDATE_USER_tt_trucker_center_master!: Sequelize.HasManyAddAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  addUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManyAddAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  createUPDATE_USER_tt_trucker_center_master!: Sequelize.HasManyCreateAssociationMixin<tt_trucker_center_master>;
  removeUPDATE_USER_tt_trucker_center_master!: Sequelize.HasManyRemoveAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  removeUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManyRemoveAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  hasUPDATE_USER_tt_trucker_center_master!: Sequelize.HasManyHasAssociationMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  hasUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManyHasAssociationsMixin<tt_trucker_center_master, tt_trucker_center_masterId>;
  countUPDATE_USER_tt_trucker_center_masters!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user belongsTo tt_user via JOIN_PERMIT_USER_ID
  JOIN_PERMIT_USER!: tt_user;
  getJOIN_PERMIT_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setJOIN_PERMIT_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createJOIN_PERMIT_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_user hasMany tt_user_badge via USER_ID
  tt_user_badges!: tt_user_badge[];
  getTt_user_badges!: Sequelize.HasManyGetAssociationsMixin<tt_user_badge>;
  setTt_user_badges!: Sequelize.HasManySetAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  addTt_user_badge!: Sequelize.HasManyAddAssociationMixin<tt_user_badge, tt_user_badgeId>;
  addTt_user_badges!: Sequelize.HasManyAddAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  createTt_user_badge!: Sequelize.HasManyCreateAssociationMixin<tt_user_badge>;
  removeTt_user_badge!: Sequelize.HasManyRemoveAssociationMixin<tt_user_badge, tt_user_badgeId>;
  removeTt_user_badges!: Sequelize.HasManyRemoveAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  hasTt_user_badge!: Sequelize.HasManyHasAssociationMixin<tt_user_badge, tt_user_badgeId>;
  hasTt_user_badges!: Sequelize.HasManyHasAssociationsMixin<tt_user_badge, tt_user_badgeId>;
  countTt_user_badges!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasMany tt_user_signout via USER_ID
  tt_user_signouts!: tt_user_signout[];
  getTt_user_signouts!: Sequelize.HasManyGetAssociationsMixin<tt_user_signout>;
  setTt_user_signouts!: Sequelize.HasManySetAssociationsMixin<tt_user_signout, tt_user_signoutId>;
  addTt_user_signout!: Sequelize.HasManyAddAssociationMixin<tt_user_signout, tt_user_signoutId>;
  addTt_user_signouts!: Sequelize.HasManyAddAssociationsMixin<tt_user_signout, tt_user_signoutId>;
  createTt_user_signout!: Sequelize.HasManyCreateAssociationMixin<tt_user_signout>;
  removeTt_user_signout!: Sequelize.HasManyRemoveAssociationMixin<tt_user_signout, tt_user_signoutId>;
  removeTt_user_signouts!: Sequelize.HasManyRemoveAssociationsMixin<tt_user_signout, tt_user_signoutId>;
  hasTt_user_signout!: Sequelize.HasManyHasAssociationMixin<tt_user_signout, tt_user_signoutId>;
  hasTt_user_signouts!: Sequelize.HasManyHasAssociationsMixin<tt_user_signout, tt_user_signoutId>;
  countTt_user_signouts!: Sequelize.HasManyCountAssociationsMixin;
  // tt_user hasOne tt_user_talkplus via USER_ID
  tt_user_talkplu!: tt_user_talkplus;
  getTt_user_talkplu!: Sequelize.HasOneGetAssociationMixin<tt_user_talkplus>;
  setTt_user_talkplu!: Sequelize.HasOneSetAssociationMixin<tt_user_talkplus, tt_user_talkplusId>;
  createTt_user_talkplu!: Sequelize.HasOneCreateAssociationMixin<tt_user_talkplus>;
  // tt_user hasMany tt_view_log via USER_ID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_user {
    return tt_user.init({
    USER_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "유저 ID"
    },
    PHONE: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "전화번호",
      unique: "tt_user_unique_key"
    },
    PASSWORD: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "패스워드"
    },
    NICKNAME: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "닉네임"
    },
    NAME: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: "이름"
    },
    ACCESSTOKEN: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "접근 토큰"
    },
    FCMTOKEN: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    BUYING_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    SELLING_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    WASTE_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "폐기절감량"
    },
    GREENGAS_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    COST_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    GROUP: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "사용자 그룹 (01: 일반, 99:관리자)"
    },
    PROFILE_IMAGE: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: "프로필 이미지"
    },
    INTERIOR_COMPANY_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "인테리어 회사 소속 여부"
    },
    INTERIOR_COMPANY_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "인테리어 회사 이름 (NULL :무소속)"
    },
    BIRTHDAY: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "생일 (YYYYMMDD)"
    },
    GENDER: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "성별 (남 : 0 ; 여 : 1, etc : 9)"
    },
    ZIP_CODE: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "우편번호"
    },
    ADDRESS: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "주소"
    },
    DETAIL_ADDRESS: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "상세 주소"
    },
    JOIN_STATE: {
      type: DataTypes.STRING(5),
      allowNull: true,
      comment: "가입 상태 (01:승인대기, 02:승인거부, 03:관리자승인대기, 04:완료)"
    },
    RESTING_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "휴면 여부"
    },
    LEAVE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "탈퇴 여부"
    },
    PHONE_AUTH_CODE: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "휴대폰 인증코드"
    },
    PHONE_AUTH_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "휴대폰 인증유효 시간"
    },
    PHONE_AUTH_SUCCEED_DATE: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "휴대폰 인증 완료 시간"
    },
    PHONE_AUTH_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "휴대폰 인증 여부"
    },
    REG_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "가입일"
    },
    UPD_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일"
    },
    JOIN_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "가입 승인 날짜"
    },
    JOIN_PERMIT_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "가입 승인해준 USER_ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    JOIN_AGREE: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "0",
      comment: "가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)"
    },
    AGREE_UPD_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    ACCESS_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_user',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "tt_user_unique_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PHONE" },
        ]
      },
      {
        name: "FK_tt_user_JOIN_PERMIT_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "JOIN_PERMIT_USER_ID" },
        ]
      },
    ]
  });
  }
}
