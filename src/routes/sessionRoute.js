const sessionRoute = require('express').Router();
const SessionController = require('../controllers/session.controller');
const Auth = require('../services/auth.service');

const { HTTPGetAllSessions, HTTPGetSession } = new SessionController();

sessionRoute.use(Auth.protectRoute);

sessionRoute.get('/', HTTPGetAllSessions);
sessionRoute.get('/:id', HTTPGetSession);

module.exports = sessionRoute;
