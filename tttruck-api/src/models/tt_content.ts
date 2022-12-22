import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
