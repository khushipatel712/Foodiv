const express = require('express');
const router = express.Router();
const shareprofitController = require('../controllers/shareprofitController');
const upload = require('../config/multerConfig'); 

router.get('/shareprofit', shareprofitController.getShareProfit);


router.put('/shareprofit', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]), shareprofitController.updateShareProfit);


router.delete('/shareprofit/keypoints', shareprofitController.removeKeypoint);

module.exports = router;
