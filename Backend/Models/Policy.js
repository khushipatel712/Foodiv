const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    terms: { type: String, required: true },
    privacy: { type: String, required: true },
    shipping: { type: String, required: true },
    cancellation: { type: String, required: true },
}, { timestamps: true });

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
