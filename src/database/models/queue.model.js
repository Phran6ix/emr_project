const mongoose = require('mongoose');
const queueSchema = mongoose.Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient id is required'],
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Doctor id is required'],
  },
  attendedTo: {
    type: Boolean,
    default: false,
  },
  session: {
    type: mongoose.Types.ObjectId,
    ref: 'Session',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Queue', queueSchema);
