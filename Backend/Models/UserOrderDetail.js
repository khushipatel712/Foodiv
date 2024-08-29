const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the User schema
const userOrderDetailSchema = new Schema({
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required:true
  },
 contactDetail:Object,
 orderDetail:Object,
 transactionDetail:Object,
 cartItem:Object,
 totalAmount: Object,

});

// Create and export the User model
const UserOrderDetail = mongoose.model('UserOrderDetail', userOrderDetailSchema);
module.exports = UserOrderDetail;
