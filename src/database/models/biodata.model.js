const Mongoose = require('mongoose');

const BioDataSchema = Mongoose.Schema({
  age: {
    type: Number,
  },
  sex: {
    type: String,
    enum: ['M', 'F'],
    required: [true, 'age is required'],
  },
  address: {
    type: String,
  },

  genotype: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  registration: {
    type: String,
  },

  occupation: {
    type: String,
  },
  //
});

module.exports = Mongoose.model('BioData', BioDataSchema);
