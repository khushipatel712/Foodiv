const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [
        {
            title: { type: String, required: true },
            logo: { type: String, required: true },
            alt_tag: { type: String, required: true },
            description: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Feature', featureSchema);
