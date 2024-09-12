const mongoose = require('mongoose');

const BlogDetailSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
},
{
    timestamps:true
});

module.exports = mongoose.model('BlogDetail', BlogDetailSchema);
