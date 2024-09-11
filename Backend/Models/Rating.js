const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  logo: { 
    type: String, 
    required: true 
  }, 
  alt_tag: { 
    type: String, 
    required: true 
  },  
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },  
  timestamp: { 
    type: Date, 
    default: Date.now 
  }  
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
