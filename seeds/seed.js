const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userSeeds.js');
const postData = require('./postSeeds.js');
const commentData = require('./commentSeeds.js');

// Seeds the database from the seed files
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
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
