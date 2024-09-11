const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const upload = require('../config/multerConfig');
const multer = require('multer');

// Route to get review data
router.get('/reviews', reviewController.getReviews);

// Route to update or create review data
router.put('/reviews', (req, res, next) => {
    const dynamicUpload = upload.fields([
        { name: 'image', maxCount: 1 }, // Single image upload field
        { name: 'reviews[0][profile]', maxCount: 1 }, // Handle profile image for review 0
        { name: 'reviews[1][profile]', maxCount: 1 } ,
        { name: 'reviews[2][profile]', maxCount: 1 } ,// Handle profile image for review 1
        { name: 'reviews[3][profile]', maxCount: 1 },
        { name: 'reviews[4][profile]', maxCount: 1 },
        { name: 'reviews[5][profile]', maxCount: 1 },
        { name: 'reviews[6][profile]', maxCount: 1 },
        { name: 'reviews[7][profile]', maxCount: 1 },
        { name: 'reviews[8][profile]', maxCount: 1 },
        { name: 'reviews[9][profile]', maxCount: 1 },
        { name: 'reviews[10][profile]', maxCount: 1 },
        { name: 'reviews[11][profile]', maxCount: 1 },
        { name: 'reviews[12][profile]', maxCount: 1 },
        { name: 'reviews[13][profile]', maxCount: 1 },
        { name: 'reviews[14][profile]', maxCount: 1 },
        { name: 'reviews[15][profile]', maxCount: 1 },
        { name: 'reviews[16][profile]', maxCount: 1 },
        { name: 'reviews[17][profile]', maxCount: 1 },
        { name: 'reviews[18][profile]', maxCount: 1 },
        { name: 'reviews[19][profile]', maxCount: 1 },
        // Add more fields for additional review items
    ]);

    dynamicUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: 'File upload error', error: err.message });
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).json({ message: 'Unknown error', error: err.message });
        }

        console.log('Files uploaded:', req.files);
        console.log('Request body:', req.body);
        next();
    });
}, reviewController.updateReviews);


// Route to remove a review item by ID
router.delete('/reviews/:itemId', reviewController.removeReviewItem);

module.exports = router;