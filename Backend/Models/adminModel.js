const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: { 
        type: Boolean,
        default: false
    },
    state: {
        type: String,
     
    },
    area: {
        type: String,
    
    },
    city: {
        type: String,
     
    },
    address: {
        type: String,
      
    },
    latitude: {
        type: String,
    
    },
    longitude: {
        type: String,
 
    },
    domain: {
        type: String,
        
    },
    image: {
        type: String // Field for image path
    },
    online: {
        type: Boolean,
        default: true 
    }
});

module.exports = mongoose.model('Admin', adminSchema);
