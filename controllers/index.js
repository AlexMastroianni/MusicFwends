const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const feedRoutes = require('./feedRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/feed', feedRoutes);
router.use('/api', apiRoutes);

module.exports = router;