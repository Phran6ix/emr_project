const Mongoose = require('mongoose');

const TestSchema = Mongoose.Schema({});

module.exports = Mongoose.model('Test', TestSchema);
