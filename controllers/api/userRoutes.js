const { User } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    // save the boolean that they are logged in and who is logged in to cookies
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
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

    // user the Models "built-in" check password function to see if the password sent
    // matches the password attached to this user
    const validPassword = await userData.checkPassword(req.body.password);

    // if that comes back false, send a 400 then stop
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // save the boolean that they are logged in and who is logged in to cookies
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // send some data back just to be nice
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
