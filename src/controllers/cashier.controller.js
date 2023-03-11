const CashierService = require('../services/cashier.service');
const serverResponse = require('../utils/response');

module.exports = class CashierController {
  async HTTPgetPendingTestsAndPrescription(req, res, next) {
    try {
      const response = await CashierService.getAllPendingLabTestAndXray();
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

      serverResponse(res, 200, { test, message: 'Updated Successfully' });
    } catch (error) {
      next(error);
    }
  }
};
