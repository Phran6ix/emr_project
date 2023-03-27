const Mongoose = require('mongoose');

const prescriptionSchema = Mongoose.Schema({
  quantity: {
    type: Number,
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

  dispersed: {
    type: Boolean,
    default: false,
  },
  // relations
  drugId: {
    type: Mongoose.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },

  patient: {
    type: Mongoose.Types.ObjectId,
    ref: 'Patient',
  },

  doctor: {
    type: Mongoose.Types.ObjectId,
    ref: 'Staff',
    required: [true, 'Doctor ID is required'],
  },

  sessionID: {
    type: Mongoose.Types.ObjectId,
    ref: 'Session',
  },
});

module.exports = Mongoose.model('Prescription', prescriptionSchema);
