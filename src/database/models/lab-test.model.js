const Mongoose = require('mongoose');

const TestSchema = Mongoose.Schema({
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

  test: {
    type: Mongoose.Types.ObjectId,
    ref: 'Inventory',
  },

  description: {
    type: String,
  },

  result: {
    result: {
      type: String,
    },
    description: {
      type: String,
    },
  },

  paid: {
    type: Boolean,
    default: false,
  },

  concluded: {
    type: Boolean,
    default: false,
  },
});

module.exports = Mongoose.model('Lab', TestSchema);
