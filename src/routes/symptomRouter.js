const SymptomController = require('../controllers/symptoms.controller.');

const SymptomRouter = require('express').Router();
const {
  HttpAddPatientSymptom,
  HttpDeletePatientSymptom,
  HttpEditPatientSymptom,
  HttpGetPatientSymptom,
  HttpGetSessionSymptom,
} = new SymptomController();

SymptomRouter.post('/', HttpAddPatientSymptom);

SymptomRouter.route('/:id')
  .get(HttpGetPatientSymptom)
  .patch(HttpEditPatientSymptom)
  .delete(HttpDeletePatientSymptom);

SymptomRouter.get('/session/:id', HttpGetSessionSymptom);

module.exports = SymptomRouter;
