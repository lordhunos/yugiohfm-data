const router = require('express').Router();
const bodyParser = require('body-parser');
const teaRouter = require('./teaRoutes.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(teaRouter);

module.exports = router;