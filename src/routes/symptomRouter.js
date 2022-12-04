const SymptomController = require('../controllers/symptoms.controller.');

const SymptomRouter = require('express').Router();
const {
  HttpAddPatientSymptom,
  HttpDeletePatientSymptom,
  HttpEditPatientSymptom,
  HttpGetPatientSymptom,
  HttpGetSessionSymptom,
} = new SymptomController();

SymptomRouter.route('/').post;
module.exports = SymptomRouter;
