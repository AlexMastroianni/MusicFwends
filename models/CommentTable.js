const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CommentTable extends Model {}

CommentTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
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
    post_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "postTable",
        key: "id",
      },
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
