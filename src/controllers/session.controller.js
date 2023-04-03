const SessionService = require('../services/session.service');
const serverResponse = require('../utils/response');
const X = require('../exceptions/operational.exception');

module.exports = class SessionController {
  async HTTPGetAllSessions(req, res, next) {
    try {
      const sessions = await SessionService.getAllSession();
      serverResponse(res, 200, sessions);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetSessionOnPatient(req, res, next) {
    try {
      const response = await SessionService.getSessionsonPatient({
        patient: req.query.patient,
      });
      return serverResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetSession(req, res, next) {
    try {
      const session = await SessionService.getSession({
        sessionID: req.params.id,
      });

      serverResponse(res, 200, session);
    } catch (error) {
      next(error);
    }
  }
};
