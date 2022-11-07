const router = require('express').Router();
const feedRoutes = require('./feedRoutes');
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/feed', feedRoutes);

module.exports = router;
