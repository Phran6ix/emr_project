const Mongoose = require('mongoose');

const AppointmentSchema = Mongoose.Schema({
  appointmentDate: {
    type: Date,
    default: Date.now,
  },
  attendance: {
    type: Boolean,
  },
});
