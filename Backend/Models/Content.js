const mongoose = require('mongoose');
const System = require('../Models/System')

const KeypointSchema = new mongoose.Schema({
  keytitle: { type: String, required: true },
  keydetail: { type: String, required: true }
});


const PanelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  image: { type: String },
  keypoints: [KeypointSchema]
});


const ContentSchema = new mongoose.Schema({
  title: { type: String },
  image1: { type: String },
  content1: { type: String },
  title2: { type: String },
  content2: { type: String },
  panel: [PanelSchema],
  title3: { type: String },
  title4: { type: String },
  faqs: {
    title: { type: String },
    description: { type: String },
    questions: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ]
  },

  system: { type: mongoose.Schema.Types.ObjectId, ref: 'System', required: true }
});

module.exports = mongoose.model('Content', ContentSchema);
