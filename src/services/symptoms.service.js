const PatientSymptom = require('../database/models/patient-symptom.model');
const Session = require('../database/models/patient-session.model');
const X = require('../exceptions/operational.exception');

module.exports = class symptomService {
  static async addPatientSymptom(payload) {
    try {
      const doc = await PatientSymptom.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async editPatientSymptom(symptom_id, payload) {
    try {
      const doc = await PatientSymptom.findByIdAndUpdate(
        symptom_id,
        payload
      ).populate({
        path: 'symptom',
        select: 'title description',
      });
      if (!doc) throw new X('no symptom found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deletePatientSymptom(symptom_id) {
    try {
      const doc = await PatientSymptom.findByIdAndDelete(symptom_id);
      if (!doc) throw new X('no symptom found with the provided id', 404);
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionSymptoms(session_id) {
    try {
      const session = await Session.findById(session_id)
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .select('status createdAt patient');

      const docs = await PatientSymptom.find({
        sessionID: session_id,
      })
        .populate({
          path: 'symptom',
          select: 'title description -_id',
        })
        .select('symptom note');

      if (!docs || !session) {
        throw new X('Document not found', 404);
      }
      return {
        session,
        symptoms: docs,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getOneSymptom(symptom_id) {
    try {
      const doc = await PatientSymptom.findById(symptom_id)
        .populate({
          path: 'symptom',
          select: 'title description',
        })
        .populate({
          path: 'patient',
          select: 'name dob PID ',
        })
        .populate({
          path: 'doctor',
          select: 'role fullName username',
        })
        .populate({
          path: 'sessionID',
          select: '-__v -_id',
        });
      if (!doc) throw new X('no symptom found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }
};
