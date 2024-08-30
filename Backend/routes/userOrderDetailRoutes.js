const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig')
const orderMiddleware=require('../middlewares/orderMiddleware')
const userOrderDetail = require('../controllers/orderController');

router.post('/userorder', userOrderDetail.postorderDeatils);

router.put('/order/status/:orderid',upload.none(), orderMiddleware.validateOrderStatus, userOrderDetail.updateOrderStatus);


router.get('/orders/admin/:adminId', userOrderDetail.getAllOrders);


router.delete('/order/:orderId', userOrderDetail.deleteOrder);


module.exports=router;