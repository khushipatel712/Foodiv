const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setupController'); 
const upload = require('../config/multerConfig');
const multer = require('multer');

// Route to get setup data
router.get('/setup', setupController.getSetup);

// Route to update or create setup data
router.put('/setup', (req, res, next) => {
    upload.any()(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error', error: err.message });
        }
        next();
    });
}, setupController.updateSetup);

// Route to remove a setup item by ID
router.delete('/setup/:itemId', setupController.removeSetupItem);

module.exports = router;
