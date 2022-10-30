const version1 = require('express').Router();
const staffRouter = require('../routes/staffRouter');
const AuthRouter = require('../routes/authRouter');
const AuthService = require('../services/auth.service');

version1.use('/api/v1/auth', AuthRouter);

version1.use('/api/v1', staffRouter);

// version1.use('/api/v1')

module.exports = version1;
