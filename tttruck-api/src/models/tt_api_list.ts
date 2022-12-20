import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';
import type {tt_access_log, tt_access_logId} from './tt_access_log';
import type {tt_authority, tt_authorityId} from './tt_authority';

export interface tt_api_listAttributes {
  API_ID: number;
  API_ROUTES?: string;
  API_AUTHORITY_ID?: number;
  API_NAME?: string;
  API_COMMENT?: string;
  API_PARAMS?: string;
  API_METHOD?: string;
  API_VERSION?: string;
}

export type tt_api_listPk = "API_ID";
export type tt_api_listId = tt_api_list[tt_api_listPk];
export type tt_api_listOptionalAttributes =
  "API_ID"
  | "API_ROUTES"
  | "API_AUTHORITY_ID"
  | "API_NAME"
  | "API_COMMENT"
  | "API_PARAMS"
  | "API_METHOD"
  | "API_VERSION";
export type tt_api_listCreationAttributes = Optional<tt_api_listAttributes, tt_api_listOptionalAttributes>;

export class tt_api_list extends Model<tt_api_listAttributes, tt_api_listCreationAttributes> implements tt_api_listAttributes {
  API_ID!: number;
  API_ROUTES?: string;
  API_AUTHORITY_ID?: number;
  API_NAME?: string;
  API_COMMENT?: string;
  API_PARAMS?: string;
  API_METHOD?: string;
  API_VERSION?: string;

  // tt_api_list hasMany tt_access_log via API_ID
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
  // tt_api_list belongsTo tt_authority via API_AUTHORITY_ID
  API_AUTHORITY!: tt_authority;
  getAPI_AUTHORITY!: Sequelize.BelongsToGetAssociationMixin<tt_authority>;
  setAPI_AUTHORITY!: Sequelize.BelongsToSetAssociationMixin<tt_authority, tt_authorityId>;
  createAPI_AUTHORITY!: Sequelize.BelongsToCreateAssociationMixin<tt_authority>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tt_api_list {
    return tt_api_list.init({
      API_ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: "API ID",
      },
      API_ROUTES: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "API Routes",
      },
      API_AUTHORITY_ID: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        comment: "API 권한 ID",
        references: {
          model: 'tt_authority',
          key: 'AUTHORITY_ID',
        },
      },
      API_NAME: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "API 이름",
      },
      API_COMMENT: {
        type: DataTypes.STRING(300),
        allowNull: true,
        comment: "API 코멘트",
      },
      API_PARAMS: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "API 피라미터",
      },
      API_METHOD: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "API 메소드",
      },
      API_VERSION: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "API 버전",
      },
    }, {
      sequelize,
      tableName: 'tt_api_list',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {name: "API_ID"},
          ],
        },
        {
          name: "FK_tt_api_list_API_AUTHORITY_ID_tt_authority_AUTHORITY_ID",
          using: "BTREE",
          fields: [
            {name: "API_AUTHORITY_ID"},
          ],
        },
      ],
    });
  }
}
