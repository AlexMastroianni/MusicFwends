const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PostTable extends Model { }

// Post model and it's required attributes
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
    author_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'user',
        key: 'id',
      },
    },
    // reaction: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = PostTable;
