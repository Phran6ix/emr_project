const Mongoose = require('mongoose');

const DiagnosisSchema = Mongoose.Schema({
  note: {
    type: String,
  },

  description: {
    type: String,
  },

  diagnosis: {
    type: Mongoose.Types.ObjectId,
    ref: 'DiagNote',
  },

  sessionID: {
    type: Mongoose.Types.ObjectId,
    required: true,
    ref: 'Session',
  },

  patient: {
    type: Mongoose.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },

  doctor: {
    type: Mongoose.Types.ObjectId,
    ref: 'Staff',
  },
});

module.exports = Mongoose.model('Diagnosis', DiagnosisSchema);
