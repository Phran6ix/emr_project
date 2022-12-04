const SymptomController = require('../controllers/symptoms.controller.');

const SymptomRouter = require('express').Router();
const {
  HttpAddPatientSymptom,
  HttpDeletePatientSymptom,
  HttpEditPatientSymptom,
  HttpGetPatientSymptom,
  HttpGetSessionSymptom,
} = new SymptomController();

SymptomRouter.route('/').post(HttpAddPatientSymptom);

module.exports = SymptomRouter;
