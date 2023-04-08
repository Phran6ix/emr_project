const HistoryService = require('../services/history');
const serverResponse = require('../utils/response');

module.exports = class HistoryController {
  async HTTPGetPatientHistory(req, res, next) {
    try {
      const history = await HistoryService.getPatientHistory(req.query.session);
      serverResponse(res, 200, history);
    } catch (error) {
      next(error);
    }
  }
};
