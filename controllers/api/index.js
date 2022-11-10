const router = require('express').Router();
const feedRoutes = require('./feedRoutes');

router.use('/users', userRoutes);
router.use('/feed', feedRoutes);

module.exports = router;
