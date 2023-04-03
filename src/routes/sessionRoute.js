const sessionRoute = require('express').Router();
const SessionController = require('../controllers/session.controller');
const Auth = require('../services/auth.service');

const { HTTPGetAllSessions, HTTPGetSession, HTTPGetSessionOnPatient } =
  new SessionController();

sessionRoute.use(Auth.protectRoute);

sessionRoute.get('/patient', HTTPGetSessionOnPatient);
sessionRoute.get('/', HTTPGetAllSessions);
sessionRoute.get('/:id', HTTPGetSession);

module.exports = sessionRoute;
