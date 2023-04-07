const { Schema, model, default: mongoose } = require('mongoose');

const symptomSchema = Schema({
  title: {
    type: String,
    required: [true, 'A symtpom must have a title'],
    umique: true,
  },
});

module.exports = model('Symptom', symptomSchema);
