const Mongoose = require('mongoose');

const DiagnosisSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'appointment string is required'],
  },

  sessionID: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  patient: {
    type: Mongoose.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
});

module.exports = Mongoose.model('Diagnosis', DiagnosisSchema);
