const User = require("./User");
const Post = require("./PostTable");
const Comment = require("./CommentTable");

User.HasMany(Post);

Post.HasMany(Comment, {
  foreignKey: "post_id",
});

Post.BelongsTo(User, {
  foreignKey: "author",
});

Comment.BelongsTo(User, {
  foreignKey: "author",
});

Comment.BelongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
