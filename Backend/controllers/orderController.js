const UserOrderDetail = require('../Models/UserOrderDetail');


exports.postorderDeatils = async (req, res) => {

    // console.log(req.body)
    const order = new UserOrderDetail({
        admin: req.body.adminId,
        contactDetail: req.body.contactInfo.contactInfo,
        transactionDetail: req.body.paymentInfo.paymentType,
        orderDetail: req.body.orderDetail,
        cartItem: req.body.cartItem.cartItems,
        totalAmount: req.body.cartItem.totalAmount
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

// exports.getOrderDetails = async (req, res) => {



// }

