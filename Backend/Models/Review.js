const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    reviews: [
        {
            title: { type: String, required: true },
            profile: { type: String, required: true }, 
            alt_tag: { type: String, required: true },
            name: { type: String, required: true },
            address: { type: String, required: true },
            review: { type: String, required: true } 
        }
    ]
});

module.exports = mongoose.model('Review', reviewSchema);
