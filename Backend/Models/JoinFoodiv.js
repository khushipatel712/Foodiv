const mongoose = require('mongoose');

const joinFoodivSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  altTag: {
    type: String,
    required: true,
  }
});

const JoinFoodiv = mongoose.model('JoinFoodiv', joinFoodivSchema);

module.exports = JoinFoodiv;
