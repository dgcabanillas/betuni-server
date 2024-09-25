const express = require('express');
const router = express.Router();
const { addCredit, getCredits } = require('../controllers/credit.controller');

router.post('/add', addCredit);
router.post('/get', getCredits);

module.exports = router;
