const PatientSymptom = require('../database/models/patient-symptom.model');
const X = require('../exceptions/operational.exception');
const Symptom = require('../database/models/symptoms.model');

module.exports = class symptomController {
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
      const doc = await PatientSymptom.findByIdAndUpdate(symptom_id, payload);
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
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionSymptoms(session_id) {
    try {
      const docs = await PatientSymptom.find({ sessionId: session_id });
      return docs;
    } catch (error) {
      throw error;
    }
  }
};
