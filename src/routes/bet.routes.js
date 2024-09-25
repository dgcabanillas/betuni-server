const express = require('express');
const router = express.Router();
const { placeBet } = require('../controllers/bet.controller');

router.post('/', placeBet);

module.exports = router;
