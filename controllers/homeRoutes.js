const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // check to see if the user exist
    const userData = await User.findOne({ where: { email: req.body.email } });

    // if not stop here and send a 400
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // user the Models "built-in" check password function to see if the password sent tot us
    // -- matches the password attached to this user
    const validPassword = await userData.checkPassword(req.body.password);

    // if that comes back false, send a 400 then stop
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // save the boolean that they are logged in and who is logged int to my cookies
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // send them some data back just to be nice
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.statusMessage(500).json(err);
  }
});

module.exports = router;
