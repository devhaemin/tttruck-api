import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tt_temp_imagesAttributes {
  TEMP_IMAGE_ID: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  TIME: Date;
}

export type tt_temp_imagesPk = "TEMP_IMAGE_ID";
export type tt_temp_imagesId = tt_temp_images[tt_temp_imagesPk];
export type tt_temp_imagesOptionalAttributes = "TEMP_IMAGE_ID" | "FILE_NAME" | "FILE_PATH" | "FILE_SIZE" | "ORG_FILE_SEQ" | "FILE_URL" | "THUMB_PATH" | "TIME";
export type tt_temp_imagesCreationAttributes = Optional<tt_temp_imagesAttributes, tt_temp_imagesOptionalAttributes>;

export class tt_temp_images extends Model<tt_temp_imagesAttributes, tt_temp_imagesCreationAttributes> implements tt_temp_imagesAttributes {
  TEMP_IMAGE_ID!: number;
  FILE_NAME?: string;
  FILE_PATH?: string;
  FILE_SIZE?: number;
  ORG_FILE_SEQ?: number;
  FILE_URL?: string;
  THUMB_PATH?: string;
  TIME!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof tt_temp_images {
    return tt_temp_images.init({
    TEMP_IMAGE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    FILE_NAME: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    FILE_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    FILE_SIZE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ORG_FILE_SEQ: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FILE_URL: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    THUMB_PATH: {
      type: DataTypes.STRING(800),
      allowNull: true
    },
    TIME: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'tt_temp_images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TEMP_IMAGE_ID" },
        ]
      },
    ]
  });
  }
}
