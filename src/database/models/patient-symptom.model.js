const Mongoose = require('mongoose');

const SymptomsSchema = Mongoose.Schema({
  //
  symptom: {
    type: Mongoose.Types.ObjectId,
    ref: 'Symptom',
  },

  note: {
    type: String,
    default: false,
  },

  description: {
    type: String,
  },
  patient: {
    type: Mongoose.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },

  doctor: {
    type: Mongoose.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },

  sessionID: {
    type: Mongoose.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
});

module.exports = Mongoose.model('PatientSymptom', SymptomsSchema);
