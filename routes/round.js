const express = require('express');
const controller = require('../controllers/round');
const router = express.Router();

router.get('/game', controller.getRounds);
router.post('/', controller.create);

module.exports = router;
