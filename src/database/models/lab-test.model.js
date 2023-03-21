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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  result: {
    type: String,
  },

  paid: {
    type: Boolean,
    default: false,
  },
  concluded: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

module.exports = Mongoose.model('Lab', TestSchema);
