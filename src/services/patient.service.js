// const { findByIdAndUpdate } = require('../database/models/patient.model');
const X = require('../exceptions/operational.exception');
const Patient = require('../database/models/patient.model');
const { dumbPatient, dumbBio } = require('../utils/helper');
const BioData = require('../database/models/biodata.model');

module.exports = class PatientService {
  // patient and bio-data service
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

  static async getOnePatient(id) {
    try {
      let doc = await Patient.findById(id);
      return dumbPatient.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async getAllBioData() {
    try {
      let docs = await BioData.find();
      docs = docs.map((doc) => dumbBio.call(doc));
      return docs;
    } catch (error) {
      throw error;
    }
  }

  static async addPatientBio(payload) {
    try {
      const doc = await BioData.create(payload);
      return dumbBio.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async getOnePatientBio(patient_id) {
    try {
      const doc = await BioData.findOne({ patient_id });
      if (!doc)
        throw new X('no patient bio-data found with the provided id', 404);
      return dumbBio.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async updatePatientBio(patientId, payload) {
    try {
      const doc = await BioData.findByIdAndUpdate(patientId, payload);
      return dumbBio.call(doc);
    } catch (error) {
      throw error;
    }
  }
};
