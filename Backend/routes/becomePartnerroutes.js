const express = require('express');
const router = express.Router();
const becomePartnerController = require('../controllers/becomePartnerController'); 
const upload = require('../config/multerConfig');
const multer = require('multer');

router.get('/become-partner', becomePartnerController.getBecomePartner);

router.put('/become-partner', (req, res, next) => {
    upload.any()(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error', error: err.message });
        }
        next();
    });
}, becomePartnerController.updateBecomePartner);

// Route to remove a setup item by ID
router.delete('/become-partner/:itemId', becomePartnerController.removeSetupItem);

module.exports = router;
