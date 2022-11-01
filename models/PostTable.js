const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PostTable extends Model {}

PostTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authur: {
      type: DataTypes.STRING,
      reference: {
        model: "user",
        key: "id",
      },
    },
    reaction: {
      type: DataTypes.VARCHAR,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "postTable",
  }
);
