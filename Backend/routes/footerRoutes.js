const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');
const upload=require('../config/multerConfig')


router.get('/', footerController.getFooter);

router.post('/', upload.single('logo'), footerController.updateFooter);

module.exports = router;