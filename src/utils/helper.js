const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signToken(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET);
}

async function verifyToken(token) {
  return await jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  verifyToken,
  signToken,
};
