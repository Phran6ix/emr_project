const Mongoose = require('mongoose');

const DiagnosisSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'appointment string is required'],
  },

  sessionId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  patientId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = Mongoose.model('Diagnosis', DiagnosisSchema);
