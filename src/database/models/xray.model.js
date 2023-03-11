const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

const XRaySchema = Mongoose.Schema({
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

  title: {
    type: String,
  },
  description: {
    type: String,
  },
  result: {
    type: String,
  },

  concluded: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = Mongoose.model('X-ray', XRaySchema);
