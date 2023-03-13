const Prescription = require('../database/models/prescription.model');
const Diagnosis = require('../database/models/diagnosis.model');

const X = require('../exceptions/operational.exception');

module.exports = class PrescriptionService {
  static async addPrescription(payload) {
    try {
      const doc = await Prescription.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async updatePrescription(patientId, payload) {
    try {
      const doc = await Prescription.findByIdAndUpdate(patientId, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deletePrescription(patientId) {
    try {
      const doc = await Prescription.findByIdAndDelete(patientId);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getPrescription(patientId) {
    try {
      const doc = await Prescription.findOne({ patient: patientId });
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosis(diagnosis_id) {
    try {
      const doc = await Diagnosis.findById(diagnosis_id)
        .populate({
          path: 'diagnosis',
          select: 'title description',
        })
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .populate({
          path: 'doctor',
          select: 'username role fullName online status',
        });
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async updateDiagnosis(diagnosis_id, payload) {
    try {
      const doc = await Diagnosis.findByIdAndUpdate(diagnosis_id, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDiagnosis() {
    try {
      const doc = await Diagnosis.find()
        .populate({
          path: 'diagnosis',
          select: 'title description',
        })
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .populate({
          path: 'doctor',
          select: 'username role fullName online status',
        });

      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDiagnosis(diagnosis_id) {
    try {
      const doc = await Diagnosis.findByIdAndDelete(diagnosis_id);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async createDiagnosis(payload) {
    try {
      const doc = await Diagnosis.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosisSession(sessionId) {
    try {
      const docs = await Diagnosis.find(sessionId);
      return docs;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionPrescriptions(sessionId) {
    try {
      const docs = await Prescription.find(sessionId);
      return docs;
    } catch (error) {
      throw error;
    }
  }
};
