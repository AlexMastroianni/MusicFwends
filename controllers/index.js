const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const feedRoutes = require('./feedRoutes');

router.use('/', homeRoutes);
router.use('/feed', feedRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
