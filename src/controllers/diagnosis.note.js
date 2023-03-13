const DiagnosisService = require('../services/diagnosis');
const serverResponse = require('../utils/response');

module.exports = class DiagnosisController {
  async HTTPCreateDiagnosis(req, res, next) {
    try {
      const diagnosis = await DiagnosisService.addNewDiagnosis(req.body);
      return serverResponse(res, 201, { message: 'Added new diagnosis' });
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetAllDiagnosis(req, res, next) {
    try {
      const diagnosis = await DiagnosisService.getAllDiagnois();
      return serverResponse(res, 200, diagnosis);
    } catch (error) {
      next(error);
    }
  }

  async HTTPEditDiagnosis(req, res, next) {
    try {
      const editDiagnosis = await DiagnosisService.editDiagnosis(
        req.params.id,
        req.body
      );
      return serverResponse(res, 200, { message: 'Update successful' });
    } catch (error) {
      throw error;
    }
  }

  async HTTPDeleteDiagnosis(req, res, next) {
    try {
      const deleteDiagnosis = await DiagnosisService.deleteDiagnosis(
        req.params.id
      );
      return serverResponse(res, 204, {});
    } catch (error) {
      next(error);
    }
  }
};
