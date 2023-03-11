const Symptom = require('../database/models/symptom.model');
const X = require('../exceptions/operational.exception');

module.exports = class SymptomService {
  static async AddSymptom(payload) {
    try {
      const doc = await Symptom.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async GetAllSymptoms() {
    try {
      const responses = await Symptom.find();
      return responses;
    } catch (error) {
      throw error;
    }
  }

  static async EditSymptoms(id, payload) {
    try {
      const responses = await Symptom.findByIdAndUpdate(id, payload);
      if (!responses) {
        throw new X('Document not Found', 404);
      }
      return responses;
    } catch (error) {
      throw error;
    }
  }

  static async DeleteSymptom(id) {
    try {
      const doc = await Symptom.findByIdAndDelete(id);
      if (!doc) {
        throw new X('Document not found', 404);
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }
};
