const mongoose = require('mongoose');

const OnlineFoodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    logo: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    keypoints: [{ type: String, required: true }]
});

module.exports = mongoose.model('OnlineFood', OnlineFoodSchema);
