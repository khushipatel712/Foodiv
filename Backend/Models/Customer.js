// models/Customer.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const customerSchema = new Schema({
  total_restaurants: {
    type: Number,
    required: true,
    default: 0
  },
  total_countries: {
    type: Number,
    required: true,
    default: 0
  },
  total_orders: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
