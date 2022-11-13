const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Retrieves all the exisiting posts on the database
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 7,
      // includes the User to be able to render the username in feed.handlbars
      // includes the Comment model to render all related comments to the posts
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['email']
            }
          ]
        }
      ]
    });
    console.log(postData);

    // Serialize data so the template can read it
    const posts = postData.map((postData) => {
      const post = postData.get({ plain: true });
      post.is_author = post.author_id === req.session.user_id;
      return post;
    });
    console.log(
      '========================================================================='
    );
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render('feed', {
      posts,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('hello');
  }
});

// Retrieves a specific post from the database by it's name
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    res.json(postData);

    const posts = postData.get({ plain: true });

    res.render('feed', {
      posts,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;