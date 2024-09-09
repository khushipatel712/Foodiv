const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlineWebSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    points: [{ type: String, default: '' }]
});

module.exports = mongoose.model('OnlineWeb', onlineWebSchema);
