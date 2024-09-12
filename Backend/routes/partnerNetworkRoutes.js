const express = require('express');
const router = express.Router();
const partnerNetworkController = require('../controllers/partnerNetworkController');
const upload = require('../config/multerConfig');

router.get('/partnernetwork', partnerNetworkController.getPartnerNetwork);

router.put('/partnernetwork', upload.fields([{ name: 'image', maxCount: 1 }]), partnerNetworkController.updatePartnerNetwork);

router.delete('/partnernetwork/keypoints', partnerNetworkController.removeKeypoint);

module.exports = router;
