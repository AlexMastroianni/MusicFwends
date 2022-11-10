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

router.post('/', async (req, res) => {
  try {
    const newPostData = await Post.create({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        conent: req.params.conent
      }
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
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

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      limit: 7,
    });
    console.log(commentData);

    // Serialize data so the template can read it
    const comments = commentData.map((commentData) => commentData.get({ plain: true }));
    console.log(
      '========================================================================='
    );
    console.log(comments);
    // Pass serialized data and session flag into template
    res.render('feed', {
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('hello');
  }
});

module.exports = router;
