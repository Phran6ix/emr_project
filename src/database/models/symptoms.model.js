const Mongoose = require('mongoose');

const SymptomsSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model('Symptoms', SymptomsSchema);
