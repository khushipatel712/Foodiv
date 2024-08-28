const express = require('express');
const router = express.Router();
const userOrderDetail = require('../controllers/orderController');

router.post('/userorder', userOrderDetail.postorderDeatils);

module.exports=router;