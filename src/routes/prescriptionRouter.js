const prescriptionRouter = require('express').Router();
const PrescriptionController = require('../controllers/prescription.controller');
const AuthService = require('../services/auth.service');
const {
  HttpAddPrescription,
  HttpDeletePrescription,
  HttpGetPrescription,
  HttpUpdatePrescription,
  HttpGetSessionPrescriptions,
} = new PrescriptionController();

prescriptionRouter.use(AuthService.protectRoute);

prescriptionRouter.route('/').post(HttpAddPrescription);

prescriptionRouter
  .route('/:id')
  .get(HttpGetPrescription)
  .patch(HttpUpdatePrescription)
  .delete(HttpDeletePrescription);

prescriptionRouter.get('/session/:id', HttpGetSessionPrescriptions);

module.exports = prescriptionRouter;
