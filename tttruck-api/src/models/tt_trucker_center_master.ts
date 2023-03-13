import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tt_trucker_center, tt_trucker_centerId } from './tt_trucker_center';
import type { tt_user, tt_userId } from './tt_user';

export interface tt_trucker_center_masterAttributes {
  TRUCKER_CENTER_MASTER_ID: number;
  TITLE?: string;
  COMMENT_TF?: number;
  SECRET_TF?: number;
  ATTACH_TF?: number;
  DISPLAY_TF?: number;
  DIV_CODE?: string;
  CREATE_USER_ID?: number;
  CREATE_TIME?: Date;
  REG_IPv4?: number;
  REG_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_TIME?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  EXTRA_FIELD_FIRST_LABEL?: string;
  EXTRA_FIELD_FIRST_CODE?: string;
  DELETE_TF?: number;
}

export type tt_trucker_center_masterPk = "TRUCKER_CENTER_MASTER_ID";
export type tt_trucker_center_masterId = tt_trucker_center_master[tt_trucker_center_masterPk];
export type tt_trucker_center_masterOptionalAttributes = "TRUCKER_CENTER_MASTER_ID" | "TITLE" | "COMMENT_TF" | "SECRET_TF" | "ATTACH_TF" | "DISPLAY_TF" | "DIV_CODE" | "CREATE_USER_ID" | "CREATE_TIME" | "REG_IPv4" | "REG_IPv6" | "UPDATE_USER_ID" | "UPDATE_TIME" | "UPDATE_IPv4" | "UPDATE_IPv6" | "EXTRA_FIELD_FIRST_LABEL" | "EXTRA_FIELD_FIRST_CODE" | "DELETE_TF";
export type tt_trucker_center_masterCreationAttributes = Optional<tt_trucker_center_masterAttributes, tt_trucker_center_masterOptionalAttributes>;

export class tt_trucker_center_master extends Model<tt_trucker_center_masterAttributes, tt_trucker_center_masterCreationAttributes> implements tt_trucker_center_masterAttributes {
  TRUCKER_CENTER_MASTER_ID!: number;
  TITLE?: string;
  COMMENT_TF?: number;
  SECRET_TF?: number;
  ATTACH_TF?: number;
  DISPLAY_TF?: number;
  DIV_CODE?: string;
  CREATE_USER_ID?: number;
  CREATE_TIME?: Date;
  REG_IPv4?: number;
  REG_IPv6?: any;
  UPDATE_USER_ID?: number;
  UPDATE_TIME?: Date;
  UPDATE_IPv4?: number;
  UPDATE_IPv6?: any;
  EXTRA_FIELD_FIRST_LABEL?: string;
  EXTRA_FIELD_FIRST_CODE?: string;
  DELETE_TF?: number;

  // tt_trucker_center_master hasMany tt_trucker_center via TRUCKER_CENTER_MASTER_ID
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
  // tt_trucker_center_master belongsTo tt_user via CREATE_USER_ID
  CREATE_USER!: tt_user;
  getCREATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setCREATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createCREATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;
  // tt_trucker_center_master belongsTo tt_user via UPDATE_USER_ID
  UPDATE_USER!: tt_user;
  getUPDATE_USER!: Sequelize.BelongsToGetAssociationMixin<tt_user>;
  setUPDATE_USER!: Sequelize.BelongsToSetAssociationMixin<tt_user, tt_userId>;
  createUPDATE_USER!: Sequelize.BelongsToCreateAssociationMixin<tt_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_trucker_center_master {
    return tt_trucker_center_master.init({
    TRUCKER_CENTER_MASTER_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "트러커센터 카테고리 ID. 소식 카테고리 ID"
    },
    TITLE: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "트러커센터 카테고리 이름. 소식 카테고리 이름"
    },
    COMMENT_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "댓글 사용 여부. 댓글 사용 여부"
    },
    SECRET_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "비밀글 사용 여부. 비밀글 사용 여부"
    },
    ATTACH_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "첨부파일 사용 여부. 첨부파일 사용 여부"
    },
    DISPLAY_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "노출 사용 여부. 노출 사용 여부"
    },
    DIV_CODE: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "분류 코드. 분류 코드"
    },
    CREATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1,
      comment: "생성 사용자 ID. 생성 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    CREATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "생성일. 생성일"
    },
    REG_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "생성자 IPv4. 생성자 IPv4"
    },
    REG_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "생성자 IPv6. 생성자 IPv6"
    },
    UPDATE_USER_ID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      comment: "수정 사용자 ID. 수정 사용자 ID",
      references: {
        model: 'tt_user',
        key: 'USER_ID'
      }
    },
    UPDATE_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      comment: "수정일. 수정일"
    },
    UPDATE_IPv4: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "수정자 IPv4. 수정자 IPv4"
    },
    UPDATE_IPv6: {
      type: DataTypes.BLOB,
      allowNull: true,
      comment: "수정자 IPv6. 수정자 IPv6"
    },
    EXTRA_FIELD_FIRST_LABEL: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "공통 레이블. 공통 레이블"
    },
    EXTRA_FIELD_FIRST_CODE: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "레이블 값. 레이블 값"
    },
    DELETE_TF: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "삭제 여부. 삭제 여부"
    }
  }, {
    sequelize,
    tableName: 'tt_trucker_center_master',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TRUCKER_CENTER_MASTER_ID" },
        ]
      },
      {
        name: "FK_tt_trucker_center_master_CREATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "CREATE_USER_ID" },
        ]
      },
      {
        name: "FK_tt_trucker_center_master_UPDATE_USER_ID_tt_user_USER_ID",
        using: "BTREE",
        fields: [
          { name: "UPDATE_USER_ID" },
        ]
      },
    ]
  });
  }
}
