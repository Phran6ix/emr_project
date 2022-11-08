const patientRouter = require('express').Router();
const PatientController = require('../controllers/patient.controller');

const {
  HttpAddPatientBioData,
  HttpDeletePatient,
  HttpGetAllBioData,
  HttpGetAllPatients,
  HttpGetOneBioData,
  HttpGetOnePatient,
  HttpRegisterPatient,
  HttpUpdateBioData,
  HttpUpdatePatient,
} = new PatientController();

patientRouter.route('/').post(HttpRegisterPatient).get(HttpGetAllPatients);

patientRouter
  .route('/:id')
  .get(HttpGetOnePatient)
  .delete(HttpDeletePatient)
  .put(HttpUpdatePatient);

module.exports = patientRouter;
