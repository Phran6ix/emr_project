const { findByIdAndUpdate } = require('../database/models/patient.model');
const Patient = require('../database/models/patient.model');
const X = require('../exceptions/operational.exception');
const { dumbPatient } = require('../utils/helper');

module.exports = class PatientService {
  static async createPatient(payload) {
    try {
      const doc = await Patient.create(payload);
      return dumbPatient.call(doc);
    } catch (error) {
      throw error;
    }
  }
  static async deletePatient(id) {
    try {
      const doc = await Patient.findByIdAndDelete(id);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return 'Doc deleted successfully';
    } catch (error) {
      throw error;
    }
  }
  static async updatePatient(id, payload) {
    try {
      const doc = await Patient.findByIdAndUpdate(id, payload);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return dumbPatient.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async getAllPatients() {
    try {
      let docs = await Patient.find();
      docs = docs.map((doc) => dumbPatient.call(doc));
      return docs;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBioData() {}
};
