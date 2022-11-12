const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CommentTable extends Model { }

// Comment model and it's required attributes
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
    post_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = CommentTable;
