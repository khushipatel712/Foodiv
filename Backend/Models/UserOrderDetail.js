const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const userOrderDetailSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  contactDetail: Object,
  orderType: String,
  transactionDetail: Object,
  paymentType :Object,
  cartItem: Object,
  totalAmount: Object,
  orderStatus: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    required: true,
    default: 'unpaid'
  },
  razorpayOrderId: {
    type: String,
    default: null
  }
}, {
  timestamps: true 
});


// Create and export the User model
const UserOrderDetail = mongoose.model('UserOrderDetail', userOrderDetailSchema);
module.exports = UserOrderDetail;
