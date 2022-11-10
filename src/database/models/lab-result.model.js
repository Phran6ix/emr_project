const Mongoose = require('mongoose');

const LabResultSchema = Mongoose.Schema({
  result: {
    type: String,
  },
});

module.exports = Mongoose.model('LabResult', LabResultSchema);
