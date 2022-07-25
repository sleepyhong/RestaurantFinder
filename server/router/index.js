const router = require('express').Router();

const YelpRouter = require('./YelpRouter');

router.use(YelpRouter);

module.exports = router;