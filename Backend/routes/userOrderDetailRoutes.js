const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig')
const orderMiddleware=require('../middlewares/orderMiddleware')
const userOrderDetail = require('../controllers/orderController');
const { order } = require('../middlewares/authMiddleware');

router.post('/userorder', userOrderDetail.postorderDetails);

router.post('/create-razorpay-order', userOrderDetail.createRazorpayOrder);

router.put('/order/status/:orderid',upload.none(), orderMiddleware.validateOrderStatus, userOrderDetail.updateOrderStatus);


router.get('/orders/admin/:adminId', userOrderDetail.getAllOrders);

router.get('/order/:orderId', userOrderDetail.getOrderById);

router.put('/order/payment/:orderId',upload.none(), userOrderDetail.updatePaymentStatus);


router.delete('/order/:orderId', userOrderDetail.deleteOrder);

router.post('/verify-payment', userOrderDetail.verifyPayment);

router.get('/order/:adminId/orders', order, userOrderDetail.getOrders);
router.post('/order/:adminId/check-order', userOrderDetail.checkOrder);


module.exports=router;