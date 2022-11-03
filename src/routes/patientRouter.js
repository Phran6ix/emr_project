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

// patientRouter.post()

module.exports = patientRouter;
