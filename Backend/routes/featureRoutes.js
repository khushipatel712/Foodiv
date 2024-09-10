const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController'); 
const upload = require('../config/multerConfig');
const multer = require('multer');

// Route to get feature data
router.get('/features', featureController.getFeatures);

// Route to update or create feature data
router.put('/features', (req, res, next) => {
    upload.any()(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error', error: err.message });
        }
        next();
    });
}, featureController.updateFeatures);

// Route to remove a feature item by ID
router.delete('/features/:itemId', featureController.removeFeatureItem);

module.exports = router;
