const Queue = require('../database/models/queue.model');
const Session = require('../database/models/patient-session.model');

module.exports = class QueueService {
  static async addPatientToQueue(payload) {
    try {
      const doc = await Queue.create(payload);
      const session = new Session({
        patient: payload.patient,
      });
      doc.session = session;
      await session.save();
      await doc.save();
      return session.id;
    } catch (error) {
      throw error;
    }
  }

  static async removePatientFromList(sessionId) {
    try {
      const doc = await Queue.findOneAndDelete({ session: sessionId });
      // const session = await Session.findByIdAndDelete(sessionId);

      if (!doc) {
        throw new X('Document not found', 404);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getDoctorsPatient(query) {
    try {
      const doc = await Queue.find(query)
        .populate({ path: 'patient', select: 'name dob email phoneNumber PID' })
        .sort({ createdAt: -1 });

      if (!doc) {
        throw new X('Document not found', 404);
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async getADoctorsPatient(query) {
    try {
      const doc = await Queue.findOne(query).populate(
        'patient',
        'name dob email phoneNumber PID'
      );
      if (!doc) {
        throw new X('Document not found', 404);
      }

      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getPatientBySessionID(query) {
    try {
      const doc = await Queue.find(query);
      if (!doc) {
        throw new X('Document not found', 404);
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }
};
