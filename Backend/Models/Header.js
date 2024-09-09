const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Header', headerSchema);
