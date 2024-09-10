const express = require('express');
const router = express.Router();
const onlineFoodController = require('../controllers/onlineFoodController');
const upload = require('../config/multerConfig'); 

router.get('/onlinefood', onlineFoodController.getOnlineFood);

router.put('/onlinefood', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]), onlineFoodController.updateOnlineFood);

router.delete('/onlinefood/keypoints', onlineFoodController.removeKeypoint);

module.exports = router;
