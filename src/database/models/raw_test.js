const { Schema, model } = require('mongoose');

const rawTestSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'This test already exists'],
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
  },

  type: {
    type: String,
    enum: ['lab', 'x-ray'],
  },
});

module.exports = model('RawTest', rawTestSchema);
