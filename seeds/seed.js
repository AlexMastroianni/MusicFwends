const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");

const userData = require("./User-seeds.js");
const postData = require("./PostTable-seeds.js");
const commentData = require("./CommentTable-seeds.js");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create(post);
  }

  for (const comment of commentData) {
    await Comment.create(comment);
  }

  process.exit(0);
};

seedDatabase();
