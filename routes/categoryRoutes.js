const express = require('express');
const quoteController = require('../controllers/quoteController');

const router = express.Router();

router.get('/:category', quoteController.quote_category);

module.exports = router;