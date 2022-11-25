const Mongoose = require('mongoose');

const SessionSchema = Mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'in-progress',
  },
});

module.exports = Mongoose.model('Session', SessionSchema);
