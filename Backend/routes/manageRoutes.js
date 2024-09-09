const express = require('express');
const router = express.Router();
const manageController = require('../controllers/manageController');
const upload = require('../config/multerConfig')


router.get('/manage', manageController.getManageData);
router.put('/manage', upload.single('video'), manageController.updateManageData);

module.exports = router;
