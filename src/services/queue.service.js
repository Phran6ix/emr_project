const Queue = require('../database/models/queue.model');
const Session = require('../database/models/patient-session.model');

module.exports = class QueueService {
  static async addPatientToQueue(payload) {
    try {
      const doc = await Queue.create(payload);
      const session = new Session({
        patient: payload.patient,
      });
      await session.save();
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async getDoctorsPatient(query) {
    try {
      const doc = await Queue.find(query)
        .populate({ path: 'patient', select: '-__v' })
        .sort({ createdAt: -1 });

      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async getADoctorsPatient(query) {
    try {
      const doc = await Queue.findOne(query).populate('patient');

      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getPatientBySessionID(query) {
    try {
      const doc = await Queue.find(query);
      return doc;
    } catch (error) {
      throw error;
    }
  }
};
