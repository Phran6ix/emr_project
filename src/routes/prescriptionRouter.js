const prescriptionRouter = require('express').Router();
const PrescriptionController = require('../controllers/prescription.controller');
const {
  HttpAddPrescription,
  HttpDeletePrescription,
  HttpGetPrescription,
  HttpUpdatePrescription,
  HttpGetSessionPrescriptions,
} = new PrescriptionController();

prescriptionRouter.route('/').post(HttpAddPrescription);

prescriptionRouter
  .route('/:id')
  .get(HttpGetPrescription)
  .patch(HttpUpdatePrescription)
  .delete(HttpDeletePrescription);

prescriptionRouter.get('/session/:id', HttpGetSessionPrescriptions);

module.exports = prescriptionRouter;
