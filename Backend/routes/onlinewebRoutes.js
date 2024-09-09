const express = require('express');
const router = express.Router();
const onlineWebController = require('../controllers/onlineWebController');

// Route to get the document
router.get('/onlineweb', onlineWebController.getOnlineWeb);

// Route to update the document
router.put('/onlineweb', onlineWebController.updateOnlineWeb);

module.exports = router;
