const Mongoose = require('mongoose');

const DiagnosisNote = Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model('DiagNote', DiagnosisNote);
