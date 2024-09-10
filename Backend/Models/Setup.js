const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setupSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    setup: [
        {
            title: { type: String, required: true },
            logo: { type: String, required: true }, // Store the path or URL of the logo image
            alt_tag: { type: String, required: true },
            description: { type: String, required: true } // Added description field
        }
    ]
});

module.exports = mongoose.model('Setup', setupSchema);
