const express = require('express');
const router = express.Router();
const seamlessController = require('../controllers/seamlessController');
const upload = require('../config/multerConfig');

router.get('/seamless', seamlessController.getSeamlessData);
router.put('/seamless', upload.single('image'), seamlessController.updateSeamlessData);

module.exports = router;