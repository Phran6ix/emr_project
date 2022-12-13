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
      const doc = await Prescription.findById(patientId);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getDiagnosis(patientId) {
    try {
      const doc = await Diagnosis.findById(patientId);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async updateDiagnosis(patientId, payload) {
    try {
      const doc = await Diagnosis.findByIdAndUpdate(patientId, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async getAllDiagnosis(patientId) {
    try {
      const doc = await Diagnosis.find();
      if (!doc) throw new X('no doc found with the provided id', 404);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDiagnosis(patientId) {
    try {
      const doc = await Diagnosis.findByIdAndDelete(patientId);
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
  // static async getSessionPrescriptions ( sessionId )
  // {
  //     try {
  //         const docs=await
  //     } catch (error) {
  //         throw error
  //     }
  // }
};
