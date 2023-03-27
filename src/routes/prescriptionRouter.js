const prescriptionRouter = require('express').Router();
const PrescriptionController = require('../controllers/prescription.controller');
const AuthService = require('../services/auth.service');
const {
  HttpAddPrescription,
  HttpDeletePrescription,
  HttpGetPrescription,
  HttpUpdatePrescription,
  HttpGetSessionPrescriptions,
  HTTPGetPaidPrescription,
  HTTPDisperseDrugs,
} = new PrescriptionController();

prescriptionRouter.use(AuthService.protectRoute);

prescriptionRouter.route('/').post(HttpAddPrescription);

prescriptionRouter.get('/patient', HTTPGetPaidPrescription);

prescriptionRouter
  .route('/:id')
  .get(HttpGetPrescription)
  .patch(HttpUpdatePrescription)
  .delete(HttpDeletePrescription);

prescriptionRouter.patch('/disperse/:id', HTTPDisperseDrugs);

prescriptionRouter.get('/session/:id', HttpGetSessionPrescriptions);

module.exports = prescriptionRouter;
