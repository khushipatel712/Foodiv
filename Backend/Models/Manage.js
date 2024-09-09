const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manageSchema = new Schema({
    video: { type: String, default: '' }, // URL or path to the video
    alt_tag: { type: String, default: '' },
    description: { type: String, default: '' },
    title: { type: String, default: '' }
});

module.exports = mongoose.model('Manage', manageSchema);
