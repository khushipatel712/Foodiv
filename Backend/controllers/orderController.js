const UserOrderDetail = require('../Models/UserOrderDetail');


exports.postorderDeatils = async (req, res) => {

    console.log(req.body)
    const order = new UserOrderDetail({
        admin: req.body.adminId,
        contactDetail: req.body.contactInfo.contactInfo,
        transactionDetail: req.body.paymentInfo.paymentType,
        orderType: req.body.orderDetail,
        cartItem: req.body.cartItem.cartItems,
        totalAmount: req.body.cartItem.totalAmount,
        orderStatus: req.body.orderStatus || "New Order"
      });
      
      try {
        const savedOrder = await order.save(); // Save the order to the database
        console.log('Order saved successfully:', savedOrder);
        res.status(201).json(savedOrder); // Respond with the saved order
      } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' }); // Respond with an error
      }
}

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
