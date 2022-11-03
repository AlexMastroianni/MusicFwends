const User = require("./User");
const Post = require("./PostTable");
const Comment = require("./CommentTable");

User.hasMany(Post);

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Post.belongsTo(User, {
  foreignKey: "author_id",
});

Comment.belongsTo(User, {
  foreignKey: "author_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
