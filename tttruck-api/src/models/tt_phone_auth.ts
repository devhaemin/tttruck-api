import * as Sequelize from 'sequelize';
import {DataTypes, Model, Optional} from 'sequelize';

export interface tt_phone_authAttributes {
  AUTH_ID: number;
  PHONE?: string;
  PHONE_AUTH_CODE?: string;
  REG_DATE: Date;
  UPD_DATE?: Date;
  PHONE_AUTH_TF: string;
}

export type tt_phone_authPk = "AUTH_ID";
export type tt_phone_authId = tt_phone_auth[tt_phone_authPk];
export type tt_phone_authOptionalAttributes =
  "AUTH_ID"
  | "PHONE"
  | "PHONE_AUTH_CODE"
  | "REG_DATE"
  | "UPD_DATE"
  | "PHONE_AUTH_TF";
export type tt_phone_authCreationAttributes = Optional<tt_phone_authAttributes, tt_phone_authOptionalAttributes>;

export class tt_phone_auth extends Model<tt_phone_authAttributes, tt_phone_authCreationAttributes> implements tt_phone_authAttributes {
  AUTH_ID!: number;
  PHONE?: string;
  PHONE_AUTH_CODE?: string;
  REG_DATE!: Date;
  UPD_DATE?: Date;
  PHONE_AUTH_TF!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof tt_phone_auth {
    return tt_phone_auth.init({
      AUTH_ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      PHONE: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      PHONE_AUTH_CODE: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      REG_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      },
      UPD_DATE: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      },
      PHONE_AUTH_TF: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "F",
      },
    }, {
      sequelize,
      tableName: 'tt_phone_auth',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {name: "AUTH_ID"},
          ],
        },
      ],
    });
  }
}
