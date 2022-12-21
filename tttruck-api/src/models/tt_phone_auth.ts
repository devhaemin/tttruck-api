import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tt_phone_authAttributes {
  AUTH_ID: number;
  PHONE?: string;
  PHONE_AUTH_CODE?: string;
  REG_TIME: Date;
  UPD_TIME?: Date;
  PHONE_AUTH_TF: string;
  EXPIRED_TIME: Date;
}

export type tt_phone_authPk = "AUTH_ID";
export type tt_phone_authId = tt_phone_auth[tt_phone_authPk];
export type tt_phone_authOptionalAttributes = "AUTH_ID" | "PHONE" | "PHONE_AUTH_CODE" | "REG_TIME" | "UPD_TIME" | "PHONE_AUTH_TF" | "EXPIRED_TIME";
export type tt_phone_authCreationAttributes = Optional<tt_phone_authAttributes, tt_phone_authOptionalAttributes>;

export class tt_phone_auth extends Model<tt_phone_authAttributes, tt_phone_authCreationAttributes> implements tt_phone_authAttributes {
  AUTH_ID!: number;
  PHONE?: string;
  PHONE_AUTH_CODE?: string;
  REG_TIME!: Date;
  UPD_TIME?: Date;
  PHONE_AUTH_TF!: string;
  EXPIRED_TIME!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof tt_phone_auth {
    return tt_phone_auth.init({
    AUTH_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    PHONE: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    PHONE_AUTH_CODE: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    REG_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    UPD_TIME: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    PHONE_AUTH_TF: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "F"
    },
    EXPIRED_TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('current_timestamp() + interval 5 minute')
    }
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
          { name: "AUTH_ID" },
        ]
      },
    ]
  });
  }
}
