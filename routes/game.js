const express = require('express');
const controller = require('../controllers/game');
const router = express.Router();

router.get('/', controller.getGameInfo);
router.post('/', controller.create);

module.exports = router;
