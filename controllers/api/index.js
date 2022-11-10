const router = require('express').Router();

const feedRoutes = require('./feedRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/feed', feedRoutes);

module.exports = router;
