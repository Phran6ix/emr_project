const patientRouter = require('express').Router();
const PatientController = require('../controllers/patient.controller');
const AuthService = require('../services/auth.service');

const {
  HttpUpdatePatient,
  HttpDeletePatient,
  HttpGetOnePatient,
  HttpGetAllPatients,
  HttpRegisterPatient,
  HttpAddPatientBioData,
  HttpGetAllBioData,
  HttpGetOneBioData,
  HttpUpdateBioData,
} = new PatientController();

patientRouter.use(AuthService.protectRoute);

patientRouter.route('/').post(HttpRegisterPatient).get(HttpGetAllPatients);

patientRouter.route('/bios').get(HttpGetAllBioData).post(HttpAddPatientBioData);

patientRouter
  .route('/:id')
  .get(HttpGetOnePatient)
  .delete(HttpDeletePatient)
  .put(HttpUpdatePatient);

patientRouter.route('/bios/:id').get(HttpGetOneBioData).put(HttpUpdateBioData);

module.exports = patientRouter;
