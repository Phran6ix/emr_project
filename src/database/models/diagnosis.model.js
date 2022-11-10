const Mongoose = require('mongoose');

const DiagnosisSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'appointment string is required'],
  },
});

module.exports = Mongoose.model('Diagnosis', DiagnosisSchema);
