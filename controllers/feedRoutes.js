const router = require('express').Router();
const { Comment, Post, User } = require('../models');
// const withAuth = require("../utils/auth");

router.get('/feed', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 7,
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    res.json(postData);

    // Serialize data so the template can read it
    const Posts = postData.map((postData) => postData.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('feed', {
      Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/feed/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    res.json(postData);

    const Posts = postData.get({ plain: true });

    res.render('feed', {
      Posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/feed/:id', async (req, res) => {
  try {
    const newPostData = await Post.create({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/feed/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post Found :(' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
