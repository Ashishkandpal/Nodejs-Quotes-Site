const express = require('express');
const quoteController = require('../controllers/quoteController');

const router = express.Router();

router.get('/', quoteController.quote_index);

router.post('/', quoteController.quote_create_post);

router.get('/create', quoteController.quote_create_get);

router.get('/:id' , quoteController.quote_details);

router.delete('/:id', quoteController.quote_delete);

module.exports = router;