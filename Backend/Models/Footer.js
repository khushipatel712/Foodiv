const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footerSchema = new Schema({
  logo: { type: String, default: '' },
  insta_link: { type: String, required: true },
  facebook_link: { type: String, required: true },
  google_link: { type: String, required: true },
  phone1: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
