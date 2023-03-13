const diagnosisRouter = require('express').Router();

const Auth = require('../services/auth.service');
const Diagnosis = require('../controllers/diagnosis.note');

const {
  HTTPCreateDiagnosis,
  HTTPDeleteDiagnosis,
  HTTPEditDiagnosis,
  HTTPGetAllDiagnosis,
} = new Diagnosis();

diagnosisRouter.use(Auth.protectRoute);

diagnosisRouter.route('/').post(HTTPCreateDiagnosis).get(HTTPGetAllDiagnosis);
diagnosisRouter
  .route('/:id')
  .patch(HTTPEditDiagnosis)
  .delete(HTTPDeleteDiagnosis);

diagnosisRouter;

module.exports = diagnosisRouter;
