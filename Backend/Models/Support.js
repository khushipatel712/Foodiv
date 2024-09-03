// models/Support.js
const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  customerCareNumber: {
    type: String,
    
  },
  mobileNumber: {
    type: String,
   
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Assuming you have an Admin model
    required: true,
  },
});

module.exports = mongoose.model('Support', supportSchema);
