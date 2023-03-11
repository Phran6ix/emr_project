const { findByIdAndDelete } = require('../database/models/lab-test.model');
const LabTest = require('../database/models/lab-test.model');
const X = require('../exceptions/operational.exception');

module.exports = class TestService {
  static async createTest(payload) {
    try {
      const doc = await LabTest.create(payload);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingTests() {
    try {
      const doc = await LabTest.find({ paid: true, concluded: false })
        .populate({ path: 'patient', select: '-__v ' })
        .populate({ path: 'doctor', select: '-__v -password' });

      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAPendingTest(filter) {
    try {
      const doc = await LabTest.findById(filter)
        .populate({ path: 'patient', select: '-__v ' })
        .populate({ path: 'doctor', select: '-__v -password' });
      if (!doc) {
        return new X('Not found', 404);
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async uploadResult(filter, payload) {
    try {
      const test = await LabTest.findOneAndUpdate(filter, payload);
      return test;
    } catch (err) {
      throw err;
    }
  }

  static async deleteTest(filter) {
    try {
      const doc = await LabTest.findByIdAndDelete(filter);
      return;
    } catch (error) {
      throw error;
    }
  }
};
