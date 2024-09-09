const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    total_restaurants: { type: Number, required: true },
    restaurants: [
        {
            title: { type: String, required: true },
            logo: { type: String, required: true }, // You can use a String to store the path or URL of the logo image
            alt_tag: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
