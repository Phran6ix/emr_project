const X = require('../exceptions/operational.exception');
const QueueService = require('../services/queue.service');
const serverResponse = require('../utils/response');

module.exports = class QueueController {
  async HTTPAddPatientToQueue(req, res, next) {
    try {
      const queue = await QueueService.addPatientToQueue(req.body);
      serverResponse(res, 201, {
        message: 'Added patient to queue',
        sessionID: queue,
      });
    } catch (error) {
      next(error);
    }
  }

  async HTTPgetDoctorsPatient(req, res, next) {
    try {
      const queue = await QueueService.getDoctorsPatient({
        doctor: req.user.id,
      });

      serverResponse(res, 200, queue);
    } catch (error) {
      next(error);
    }
  }

  async HTTPgetADoctorsPatient(req, res, next) {
    try {
      const queue = await QueueService.getADoctorsPatient({
        patient: req.params.id,
        doctor: req.user.id,
      });

      serverResponse(res, 200, queue);
    } catch (error) {
      throw error;
    }
  }
};
