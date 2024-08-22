const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: false
  },
  price: {
    type: Number,
    required: true,
  },
  comparePrice: {
    type: Number,
  },
  veg: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  variants: [{
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    comparePrice: {
      type: Number,
    },
  }],
  image: {
    type: String, 
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  show:{
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
