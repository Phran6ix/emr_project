const CashierService = require('../services/cashier.service');
const serverResponse = require('../utils/response');

module.exports = class CashierController {
  async HTTPGetPatientList(req, res, next) {
    try {
      const list = await CashierService.getListOfPatient();
      return serverResponse(res, 200, list);
    } catch (error) {
      next(error);
    }
  }
  async HTTPgetPendingTestsAndPrescription(req, res, next) {
    try {
      const response = await CashierService.getPatientLabTestAndXray({
        patient: req.query.patient,
      });
      serverResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  async HTTPApprovePending(req, res, next) {
    try {
      const test = await CashierService.approveAPayment(
        req.params.id,
        req.body.type
      );

      serverResponse(res, 200, test);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetDoctorsPatient(req, res, next) {
    try {
      const patient = await CashierService.getDoctorsPatient(req.query.doctor);
      serverResponse(res, 200, patient);
    } catch (error) {
      next(error);
    }
  }
};
