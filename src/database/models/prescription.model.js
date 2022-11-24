const Mongoose = require('mongoose');

const prescriptionSchema = Mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },

  days: {
    type: Number,
  },

  paid: {
    type: Boolean,
    default: false,
  },

  // relations
  drugId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },

  patientId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },
  sessionId: {
    type: Mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = Mongoose.model('Prescription', prescriptionSchema);
