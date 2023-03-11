const queueRouter = require('express').Router();
const AuthService = require('../services/auth.service');
const QueueController = require('../controllers/queue.controller');
const { HTTPAddPatientToQueue, HTTPgetADoctorsPatient, HTTPgetDoctorsPatient } =
  new QueueController();

queueRouter.use(AuthService.protectRoute);

queueRouter.route('/').get(HTTPgetDoctorsPatient).post(HTTPAddPatientToQueue);
queueRouter.get('/:id', HTTPgetADoctorsPatient);

module.exports = queueRouter;
