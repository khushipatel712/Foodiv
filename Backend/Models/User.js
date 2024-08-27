const mongoose = require('mongoose');
const { Schema } = mongoose;
const Admin = require ('./adminModel')

// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    mobileNumber: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    // instruction: {
    //     type: String,
    // },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
