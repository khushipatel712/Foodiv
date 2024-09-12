
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    restaurantName : {type:String , required:true},
    details: { type: String, required: true },
    slug:{type:String , required:true, unique:true},
    headline:{type:String , required:true},
    photo: { type: String, required: true },
    alt: { type: String, default: '' },
    postedBy: { type: String, required: true },
    status: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogDetail' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
);

BlogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Blog', BlogSchema);
