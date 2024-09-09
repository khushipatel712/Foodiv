
const mongoose = require('mongoose');
const Content=require('../Models/Content')

const systemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' }
});

const System = mongoose.model('System', systemSchema);

module.exports = System;
