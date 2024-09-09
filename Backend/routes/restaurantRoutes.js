const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); 
const upload=require('../config/multerConfig')

router.get('/restaurant', restaurantController.getRestaurants);
router.put('/restaurant', upload.single('logo'), restaurantController.updateRestaurants);

module.exports = router;
