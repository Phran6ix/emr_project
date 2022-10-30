const Mongoose = require('mongoose');

module.exports = async function connectDb() {
  return await Mongoose.connect(process.env.DB_URL);
};
