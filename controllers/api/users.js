const { User } = require('../../models');
const router = require('express').Router();

router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});

module.exports = router;
