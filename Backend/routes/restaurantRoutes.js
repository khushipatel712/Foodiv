const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); 
const upload=require('../config/multerConfig')
const multer=require('multer')

router.get('/restaurant', restaurantController.getRestaurants);
router.put('/restaurant', (req, res, next) => {
    upload.any()(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ message: 'Unknown error', error: err.message });
        }
        // Everything went fine.
        next();
    });
}, restaurantController.updateRestaurants);
router.delete('/restaurant/:restaurantId', restaurantController.removeRestaurant);

module.exports = router;
