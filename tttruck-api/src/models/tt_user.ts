import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_access_log, tt_access_logId } from './tt_access_log';
import type { tt_login_log, tt_login_logId } from './tt_login_log';
import type { tt_nickname_log, tt_nickname_logId } from './tt_nickname_log';
import type { tt_notice, tt_noticeId } from './tt_notice';
import type { tt_notice_master, tt_notice_masterId } from './tt_notice_master';
import type { tt_product, tt_productId } from './tt_product';
import type { tt_product_category, tt_product_categoryId } from './tt_product_category';
import type { tt_product_trade_log, tt_product_trade_logId } from './tt_product_trade_log';
import type { tt_sns_auth, tt_sns_authId } from './tt_sns_auth';
import type { tt_view_log, tt_view_logId } from './tt_view_log';

export interface tt_userAttributes {
  USER_ID: number;
  PHONE: string;
  PASSWORD: string;
  NICKNAME?: string;
  NAME: string;
  ACCESSTOKEN: string;
  WASTE_SAVINGS: number;
  GROUP: number;
  PROFILE_IMAGE?: string;
  INTERIOR_COMPANY_TF: string;
  INTERIOR_COMPANY_NAME?: string;
  BIRTHDAY?: string;
  GENDER?: number;
  ZIP_CODE?: string;
  ADDRESS?: string;
  DETAIL_ADDRESS?: string;
  JOIN_STATE?: string;
  RESTING_TF: string;
  LEAVE_TF: string;
  PHONE_AUTH_CODE?: string;
  PHONE_AUTH_DATE?: Date;
  PHONE_AUTH_SUCCEED_DATE?: Date;
  PHONE_AUTH_TF: string;
  REG_TIME?: Date;
  UPD_TIME?: Date;
  JOIN_TIME?: Date;
  JOIN_PERMIT_USER_ID?: number;
  JOIN_AGREE?: string;
}

export type tt_userPk = "USER_ID";
export type tt_userId = tt_user[tt_userPk];
export type tt_userOptionalAttributes = "USER_ID" | "NICKNAME" | "WASTE_SAVINGS" | "PROFILE_IMAGE" | "INTERIOR_COMPANY_TF" | "INTERIOR_COMPANY_NAME" | "BIRTHDAY" | "GENDER" | "ZIP_CODE" | "ADDRESS" | "DETAIL_ADDRESS" | "JOIN_STATE" | "RESTING_TF" | "LEAVE_TF" | "PHONE_AUTH_CODE" | "PHONE_AUTH_DATE" | "PHONE_AUTH_SUCCEED_DATE" | "PHONE_AUTH_TF" | "REG_TIME" | "UPD_TIME" | "JOIN_TIME" | "JOIN_PERMIT_USER_ID" | "JOIN_AGREE";
export type tt_userCreationAttributes = Optional<tt_userAttributes, tt_userOptionalAttributes>;

export class tt_user extends Model<tt_userAttributes, tt_userCreationAttributes> implements tt_userAttributes {
  USER_ID!: number;
  PHONE!: string;
  PASSWORD!: string;
  NICKNAME?: string;
  NAME!: string;
  ACCESSTOKEN!: string;
  WASTE_SAVINGS!: number;
  GROUP!: number;
  PROFILE_IMAGE?: string;
  INTERIOR_COMPANY_TF!: string;
  INTERIOR_COMPANY_NAME?: string;
  BIRTHDAY?: string;
  GENDER?: number;
  ZIP_CODE?: string;
  ADDRESS?: string;
  DETAIL_ADDRESS?: string;
  JOIN_STATE?: string;
  RESTING_TF!: string;
  LEAVE_TF!: string;
  PHONE_AUTH_CODE?: string;
  PHONE_AUTH_DATE?: Date;
  PHONE_AUTH_SUCCEED_DATE?: Date;
  PHONE_AUTH_TF!: string;
  REG_TIME?: Date;
  UPD_TIME?: Date;
  JOIN_TIME?: Date;
  JOIN_PERMIT_USER_ID?: number;
  JOIN_AGREE?: string;

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
  // tt_user hasMany tt_product_trade_log via SELLER_USER_ID
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
  // tt_user hasMany tt_product_trade_log via BUYER_USER_ID
  BUYER_USER_tt_product_trade_logs!: tt_product_trade_log[];
  getBUYER_USER_tt_product_trade_logs!: Sequelize.HasManyGetAssociationsMixin<tt_product_trade_log>;
  setBUYER_USER_tt_product_trade_logs!: Sequelize.HasManySetAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  addBUYER_USER_tt_product_trade_log!: Sequelize.HasManyAddAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  addBUYER_USER_tt_product_trade_logs!: Sequelize.HasManyAddAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  createBUYER_USER_tt_product_trade_log!: Sequelize.HasManyCreateAssociationMixin<tt_product_trade_log>;
  removeBUYER_USER_tt_product_trade_log!: Sequelize.HasManyRemoveAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  removeBUYER_USER_tt_product_trade_logs!: Sequelize.HasManyRemoveAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  hasBUYER_USER_tt_product_trade_log!: Sequelize.HasManyHasAssociationMixin<tt_product_trade_log, tt_product_trade_logId>;
  hasBUYER_USER_tt_product_trade_logs!: Sequelize.HasManyHasAssociationsMixin<tt_product_trade_log, tt_product_trade_logId>;
  countBUYER_USER_tt_product_trade_logs!: Sequelize.HasManyCountAssociationsMixin;
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
  // tt_user belongsTo tt_user via JOIN_PERMIT_USER_ID
  JOIN_PERMIT_USER!: tt_user;
  getJOIN_PERMIT_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setJOIN_PERMIT_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createJOIN_PERMIT_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
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
      allowNull: false,
      comment: "이름"
    },
    ACCESSTOKEN: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "접근 토큰"
    },
    WASTE_SAVINGS: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "폐기절감량"
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
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
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
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
      comment: "휴면 여부"
    },
    LEAVE_TF: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
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
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F",
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
      allowNull: true,
      comment: "가입 약관 동의 여부(0: 개인정보 수집 및 이용동의 1: 개인정보 수집 목적 내 제3자 제공 동의 2: 14세 미만 법정 대리인 동의)"
    }
  }, {
    sequelize,
    tableName: 'tt_user',
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
