const patientRouter = require('express').Router();
const PatientController = require('../controllers/patient.controller');

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

patientRouter.route('/').post(HttpRegisterPatient).get(HttpGetAllPatients);

patientRouter
  .route('/:id')
  .get(HttpGetOnePatient)
  .delete(HttpDeletePatient)
  .put(HttpUpdatePatient);

patientRouter.route('/bio').get(HttpGetAllBioData).post(HttpAddPatientBioData);

patientRouter.route('/bio/:id').get(HttpGetOneBioData).put(HttpUpdateBioData);

module.exports = patientRouter;
