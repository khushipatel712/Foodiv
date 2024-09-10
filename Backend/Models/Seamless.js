const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seamlessSchema = new Schema({
    image: { type: String, default: '' }, // URL or path to the image
    alt_tag: { type: String, default: '' },
    description: { type: String, default: '' },
    title: { type: String, default: '' }
});

module.exports = mongoose.model('Seamless', seamlessSchema);
