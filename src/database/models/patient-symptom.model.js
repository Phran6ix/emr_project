const Mongoose = require('mongoose');

const SymptomsSchema = Mongoose.Schema({
  //
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  note: {
    type: Boolean,
    default: false,
  },

  patientId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },

  doctorId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },

  sessionId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = Mongoose.model('Symptoms', SymptomsSchema);
