const serverResponse = require('../utils/response');
const PrescriptionService = require('../services/prescription.service');

module.exports = class PrescriptionController {
  async HttpAddPrescription(req, res, next) {
    try {
      req.body.doctorId = req.user.id;
      const resp = await PrescriptionService.addPrescription(req.body);
      return serverResponse(res, 201, resp);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async HttpUpdatePrescription(req, res, next) {
    try {
      const resp = await PrescriptionService.updatePrescription(
        req.params.id,
        req.body
      );
      return serverResponse(res, 201, resp);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async HttpDeletePrescription(req, res, next) {
    try {
      const resp = await PrescriptionService.addPrescription(req.params.id);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetPrescription(req, res, next) {
    try {
      const resp = await PrescriptionService.getPrescription(req.params.id);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetSessionPrescriptions(req, res, next) {
    try {
      //
    } catch (error) {
      next(error);
    }
  }
};