const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['terms', 'privacy', 'shipping', 'cancellation'],
    },
    content: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Policy', PolicySchema);
