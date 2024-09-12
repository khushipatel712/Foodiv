const express = require('express');
// const multer = require('multer');
const { getJoinFoodiv, updateJoinFoodiv } = require('../controllers/joinfoodivController');

const router = express.Router();

// Use your multer configuration
const upload = require('../config/multerConfig');

router.get('/join-foodiv', getJoinFoodiv);

router.put('/join-foodiv', upload.single('image'), updateJoinFoodiv);

module.exports = router;
