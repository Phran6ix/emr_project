const AuthRouter = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { HttpLoginStaff } = new AuthController();

AuthRouter.post('/login', HttpLoginStaff);

module.exports = AuthRouter;
