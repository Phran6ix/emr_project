const diagnosisRouter = require('express').Router();
const AuthService = require('../services/auth.service');
const PrescriptionController = require('../controllers/prescription.controller');
const {
  HttpGetDiagnosis,
  HttpCreateDiagnosis,
  HttpGetAllDiagnosis,
  HttpDeleteDiagnosis,
  HttpUpdateDiagnosis,
  HTTPGetSessionDiagnosis,
} = new PrescriptionController();

diagnosisRouter.use(AuthService.protectRoute);
diagnosisRouter.route('/').post(HttpCreateDiagnosis).get(HttpGetAllDiagnosis);

diagnosisRouter
  .route('/:id')
  .delete(HttpDeleteDiagnosis)
  .get(HttpGetDiagnosis)
  .patch(HttpUpdateDiagnosis);

diagnosisRouter.get('/session/:id', HTTPGetSessionDiagnosis);
module.exports = diagnosisRouter;
