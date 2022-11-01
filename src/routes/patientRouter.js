const PatientController = require('../controllers/patient.controller');

const patientRouter = require('express').Router();

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

module.exports = patientRouter;
