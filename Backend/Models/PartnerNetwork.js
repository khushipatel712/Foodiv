const mongoose = require('mongoose');

const PartnerNetworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    keypoints: [{ type: String, required: true }]
});

module.exports = mongoose.model('PartnerNetwork', PartnerNetworkSchema);
