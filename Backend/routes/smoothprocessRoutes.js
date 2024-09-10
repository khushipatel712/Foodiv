const express = require('express');
const router = express.Router();
const smoothProcessController = require('../controllers/smoothprocessController');
const upload = require('../config/multerConfig'); 

router.get('/smoothprocess', smoothProcessController.getSmoothProcess);

router.put('/smoothprocess', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]), smoothProcessController.updateSmoothProcess);

router.delete('/smoothprocess/keypoints', smoothProcessController.removeKeypoint);

module.exports = router;
