const express = require('express');
const router = express.Router();
const serveMoreController = require('../controllers/servemoreController');
const upload = require('../config/multerConfig'); 

router.get('/servemore', serveMoreController.getServeMore);


router.put('/servemore', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]), serveMoreController.updateServeMore);


router.delete('/servemore/keypoints', serveMoreController.removeKeypoint);

module.exports = router;
