// models/faq.js
const mongoose = require('mongoose');

// Define the schema for individual FAQs
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  }
});

// Define the schema for a document containing an array of FAQs
const faqArraySchema = new mongoose.Schema({
  faqs: [faqSchema] // Array of FAQ objects
});

// Create the model from the schema
const FaqArray = mongoose.model('FaqArray', faqArraySchema);

module.exports = FaqArray;
