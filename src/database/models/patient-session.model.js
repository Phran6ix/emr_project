const Mongoose = require('mongoose');

const SessionSchema = Mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'in-progress',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    patient: {
      type: Mongoose.Types.ObjectId,
      ref: 'Patient',
    },
  },
  {
    timestamp: true,
    versionKey: false,
    // toJSON:{
    //   transform(doc, )
    // }
  }
);

module.exports = Mongoose.model('Session', SessionSchema);
