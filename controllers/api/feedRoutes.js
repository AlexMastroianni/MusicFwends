const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieves and POST's the new post data whilst checking the user is logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      content: req.body.postContent,
      author_id: req.session.user_id
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Retrieves an exisiting post whilst checking the user is logged in
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        author_id: req.session.user_id
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post Found :(' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;