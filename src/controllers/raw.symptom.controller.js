const SymptomService = require('../services/raw.symptom.service');
const serverResponse = require('../utils/response');

module.exports = class SymptomController {
  async HTTPAddSymptom(req, res, next) {
    try {
      const symptom = await SymptomService.AddSymptom(req.body);
      serverResponse(res, 201, symptom);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetAllSymptoms(req, res, next) {
    try {
      const symptoms = await SymptomService.GetAllSymptoms();
      serverResponse(res, 200, symptoms);
    } catch (error) {
      next(error);
    }
  }

  async HTTPEditSymptoms(req, res, next) {
    try {
      const symptom = await SymptomService.EditSymptoms(
        req.params.id,
        req.body
      );
      serverResponse(res, 200, symptom);
    } catch (error) {
      next(error);
    }
  }

  async HTTPDeleteSymptom(req, res, next) {
    try {
      const doc = await SymptomService.DeleteSymptom(req.params.id);
      serverResponse(res, 204, {});
    } catch (error) {
      next(error);
    }
  }
};
