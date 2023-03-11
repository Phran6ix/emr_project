const SymptomRoute = require('express').Router();

const SymptomController = require('../controllers/raw.symptom.controller');
const Auth = require('../services/auth.service');

const {
  HTTPAddSymptom,
  HTTPDeleteSymptom,
  HTTPEditSymptoms,
  HTTPGetAllSymptoms,
} = new SymptomController();

SymptomRoute.use(Auth.protectRoute);

SymptomRoute.post('/', HTTPAddSymptom);
SymptomRoute.get('/', HTTPGetAllSymptoms);
SymptomRoute.route('/:id').patch(HTTPEditSymptoms).delete(HTTPDeleteSymptom);

module.exports = SymptomRoute;
