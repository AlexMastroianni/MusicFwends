const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 7,
      include: [
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
    const posts = postData.map((postData) => postData.get({ plain: true }));
    console.log(
      '========================================================================='
    );
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render('feed', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('hello');
  }
});

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
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
