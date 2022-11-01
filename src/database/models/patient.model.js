const Mongoose = require('mongoose');

const PatientSchema = Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'provide patient name'],
  },

  dob: {
    type: String,
    required: [true, 'patient date of birth is required'],
  },

  phoneNumber: {
    type: String,
    required: [true, 'provide patient phone number'],
  },

  email: {
    type: String,
    required: [true, 'patient email is required'],
  },

  PID: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model('Patient', PatientSchema);
