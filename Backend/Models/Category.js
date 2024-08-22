const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false // Optional field for image URL or path
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true // Reference to the Admin model
    },
    show:{
        type:Boolean,
        default: true
    }
});

// Export the Category model
module.exports = mongoose.model('Category', categorySchema);
