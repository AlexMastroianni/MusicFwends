const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserProfile extends Model {}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_avatar: {
      type: DataTypes.BLOB,
    },
    posts: {
      type: DataTypes.STRING("long"),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userProile",
  }
);
