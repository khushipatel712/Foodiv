const mongoose = require('mongoose');
const Admin = require('./adminModel');
const Category = require('./Category') 

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  timestamp:{type: Date,
        default: Date.now}
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
