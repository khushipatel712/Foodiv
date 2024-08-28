const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the User schema
const userOrderDetailSchema = new Schema({
 userInfo:Object,
 orderDetails:Object,
 transactionDetail:Object,

});

// Create and export the User model
const UserOrderDetail = mongoose.model('UserOrderDetail', userOrderDetailSchema);
module.exports = UserOrderDetail;
