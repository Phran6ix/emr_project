const Mongoose = require('mongoose');
const BioDataSchema = Mongoose.Schema({
  patient_id: {
    type: Mongoose.Types.ObjectId,
    required: [true, 'patient_id is required'],
  },
  age: {
    type: String,
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
