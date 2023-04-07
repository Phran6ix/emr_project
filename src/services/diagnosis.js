const Diagnosis = require('../database/models/diagnosis-note.model');
const Session = require('../database/models/patient-session.model');
const X = require('../exceptions/operational.exception');

module.exports = class DiagnosisService {
  static async addNewDiagnosis(payload) {
    try {
      const newdiagnosis = await Diagnosis.create(payload);
      return newdiagnosis;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDiagnois() {
    try {
      const diagnosis = await Diagnosis.find().select('title description');
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosisById(id) {
    try {
      const diagnosis = await Diagnosis.findById(id).select('title');

      if (!diagnosis) {
        throw new X('Doc not found', 404);
      }
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }
  static async editDiagnosis(id, payload) {
    try {
      const diagnosis = await Diagnosis.findByIdAndUpdate(id, payload);
      if (!diagnosis) {
        throw new X('Doc not found', 404);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDiagnosis(id) {
    try {
      const deleteDiagnosis = await Diagnosis.findByIdAndDelete(id);
      if (!deleteDiagnosis) {
        throw new X('Doc not found', 404);
      }
    } catch (error) {
      throw error;
    }
  }
};
