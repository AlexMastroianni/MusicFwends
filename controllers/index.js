const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const feedRoutes = require('./feedRoutes');
const apiRoutes = require('./api/signup');

router.use('/', homeRoutes);
router.use('/feed', feedRoutes);
router.use('/api', apiRoutes);

module.exports = router;
