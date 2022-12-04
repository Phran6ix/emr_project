const serverResponse = require('../utils/response');
const SymptomService = require('../services/symptoms.service');

module.exports = class SymptomController {
  async HttpAddPatientSymptom(req, res, next) {
    try {
      req.body.doctorId = req.user._id;
      const resp = await SymptomService.addPatientSymptom(req.body);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpDeletePatientSymptom(req, res, next) {
    try {
      const resp = await SymptomService.deletePatientSymptom(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpEditPatientSymptom(req, res, next) {
    try {
      const resp = await SymptomService.editPatientSymptom(
        req.params.id,
        req.body
      );
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetSessionSymptom(req, res, next) {
    try {
      const resp = await SymptomService.getSessionSymptoms(req.params.id);
      return serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetPatientSymptom(req, res, next) {
    try {
      const resp = await SymptomService.getOneSymptom(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
};
