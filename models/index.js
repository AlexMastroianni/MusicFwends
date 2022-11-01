const User = require("./User");
const UserProfile = require("./UserProfile");
const PostTable = require("./PostTable");
const CommentTable = require("./CommentTable");

User.HasOne(UserProfile);

UserProfile.HasOne(User);

UserProfile.HasMany(PostTable, {
  through: PostTable,
  foreignKey: "posts",
});

UserProfile.HasMany(CommentTable, {
  through: PostTable,
  foreignKey: "posts",
});

//userprofile has many commemnts

//post table has many commnets

//comments belong to comment

//

module.exports = { User, UserProfile, PostTable, CommentTable };
