const express = require('express');
const upload=require('../config/multerConfig')
const ratingController = require('../controllers/ratingController');

const router = express.Router();


router.post('/ratings', upload.single('logo'), ratingController.createRating);


router.get('/ratings', ratingController.getRatings);

router.get('/ratings/:id', ratingController.getRatingById);


router.put('/ratings/:id', upload.single('logo'), ratingController.updateRatingById);


router.delete('/ratings/:id', ratingController.deleteRatingById);

module.exports = router;
