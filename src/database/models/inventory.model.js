const Mongoose = require('mongoose');

const InventorySchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ['drug', 'test'],
  },
});

module.exports = Mongoose.model('Inventory', InventorySchema);
