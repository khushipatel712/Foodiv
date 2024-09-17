const UserOrderDetail = require('../Models/UserOrderDetail');
const Order = require('../Models/UserOrderDetail')
// const razorpayInstance = require('../config/razorpayConfig');
const { config } = require('dotenv');
const Razorpay = require('razorpay');
config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// exports.postOrderDetails = async (req, res) => {
//   console.log(req.body);

//   const order = new UserOrderDetail({
//     admin: req.body.adminId,
//     contactDetail: req.body.contactInfo,
//     transactionDetail: req.body.paymentInfo,
//     orderType: req.body.orderDetail,
//     cartItem: req.body.cartItems,
//     totalAmount: req.body.totalAmount,
//     orderStatus: req.body.orderStatus || "New Order",
//   });

//   try {
//     // Step 1: Check if the payment type is Razorpay
//     if (req.body.paymentInfo === "razorpay") {
//       // Create a Razorpay order
//       const razorpayOrder = await razorpay.orders.create({
//         amount: req.body.totalAmount * 100, // Amount in paisa (smallest currency unit)
//         currency: "INR",
//         receipt: `receipt_order_${Date.now()}`,
//         payment_capture: 1, // Auto-capture payment
//       });


//       console.log('Razorpay Order Response:', razorpayOrder);

//       if (!razorpayOrder || !razorpayOrder.id) {
//         throw new Error('Failed to create Razorpay order');
//       }

  
//       order.razorpayOrderId = razorpayOrder.id;
//     }

  
//     const savedOrder = await order.save();
//     console.log('Order saved successfully:', savedOrder);

//     // Respond with the saved order details
//     res.status(201).json({
//       order: savedOrder,
//       razorpayOrderId: order.razorpayOrderId || null, // Only include if Razorpay was used
//       key: req.body.paymentInfo === "razorpay" ? process.env.RAZORPAY_KEY_ID : null, // Send Razorpay Key ID only if Razorpay was used
//     });
//   } catch (error) {
//     console.error('Error processing order:', error);
//     res.status(500).json({ error: 'Failed to process order' });
//   }
// };

exports.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const crypto = require('crypto');

  // Step 1: Create a HMAC SHA256 hash using the Razorpay secret key
  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

  // Step 2: Compare the generated signature with the received signature
  if (generatedSignature === razorpay_signature) {
      // Payment verified successfully
      res.status(200).json({ message: 'Payment verified successfully' });
  } else {
      // Payment verification failed
      res.status(400).json({ error: 'Payment verification failed' });
  }
};

exports.createRazorpayOrder = async (req, res) => {
  console.log(req.body);

  try {
    const { totalAmount, paymentInfo } = req.body;

    if (paymentInfo.paymentType === 'razorpay') {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // Amount in paisa (smallest currency unit)
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
        payment_capture: 1,
      });

      if (!razorpayOrder || !razorpayOrder.id) {
        throw new Error('Failed to create Razorpay order');
      }

      res.status(200).json({
        razorpayOrderId: razorpayOrder.id,
        key: process.env.RAZORPAY_KEY_ID,
      });
    } else {
      res.status(400).json({ error: 'Invalid payment type' });
    }
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

// Endpoint to save order details after payment verification
// exports.postorderDetails = async (req, res) => {
  exports.postorderDetails = async (req, res) => {
    console.log(req.body);
  
    // Determine payment status based on transaction detail
    const isRazorpayTransaction = req.body.paymentInfo && req.body.paymentInfo.orderId;
     
    const order = new UserOrderDetail({
      admin: req.body.adminId,
      contactDetail: req.body.contactInfo,
      transactionDetail: req.body.paymentInfo,
      paymentType: req.body.paymentInfo === 'cashOnDelivery'
      ? req.body.paymentInfo
      : req.body.paymentInfo.paymentType,
      orderType: req.body.orderDetail,
      cartItem: req.body.cartItems,
      totalAmount: req.body.totalAmount,
      orderStatus: req.body.orderStatus || "New Order",
      paymentStatus: isRazorpayTransaction ? 'paid' : 'unpaid', // Set paymentStatus based on transaction detail
      razorpayOrderId: req.body.paymentInfo.orderId || null, // Store Razorpay Order ID if applicable
    });
  try {
    const savedOrder = await order.save();
    console.log('Order saved successfully:', savedOrder);

    res.status(201).json({ order: savedOrder });
    // hello
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
};



exports.updateOrderStatus = async (req, res) => {
  try {
      const orderId = req.params.orderid;
      const newStatus = req.body.orderStatus;

      const order = await UserOrderDetail.findById(orderId);

      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }

      order.orderStatus = newStatus; // Update the order status
      const updatedOrder = await order.save(); // Save the updated order

      res.status(200).json(updatedOrder); // Respond with the updated order
  } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const adminId = req.params.adminId;

    // Find all orders associated with the admin ID
    const orders = await UserOrderDetail.find({ admin: adminId });

    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found for this admin' });
    }

    res.status(200).json(orders); // Respond with the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find and delete the order by ID
    const deletedOrder = await UserOrderDetail.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' }); // Confirm successful deletion
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Extract the order ID from the request parameters

    // Find the order by its ID
    const order = await UserOrderDetail.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' }); // Respond with an error if the order is not found
    }

    res.status(200).json(order); // Respond with the found order
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' }); // Respond with an error if there's an issue
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { paymentStatus } = req.body;

    // Find the order by ID
    const order = await UserOrderDetail.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the payment status if provided
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    } else {
      return res.status(400).json({ error: 'Payment status is required' });
    }

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder); // Respond with the updated order
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { userId } = req.user; // Assuming you have middleware to extract user info from token
    const orders = await Order.find({ admin: adminId, 'contactDetail.userId': userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.checkOrder = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { mobileNumber } = req.body;
    const orders = await Order.find({ 
      admin: adminId, 
      'contactDetail.mobile': mobileNumber 
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error checking order', error: error.message });
  }
};