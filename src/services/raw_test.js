const Test = require('../database/models/raw_test');
const X = require('../exceptions/operational.exception');

module.exports = class TestService {
  static async CreateTest(payload) {
    try {
      const newTest = await Test.create(payload);

      return newTest;
    } catch (error) {
      throw error;
    }
  }

  static async GetAllTest() {
    try {
      const tests = await Test.find().select('-__v');
      return tests;
    } catch (error) {
      throw error;
    }
  }

  static async getATest(test_id) {
    try {
      const test = await Test.findById(test_id).select('-__v');

      if (!test) {
        throw new X('Test not found', 404);
      }

      return test;
    } catch (error) {
      throw error;
    }
  }

  static async updateAtest(test_id, payload) {
    try {
      const test = await Test.findByIdAndUpdate(test_id, payload);
      if (!test) {
        throw new X('Test not found', 404);
      }
      return { message: 'Test updated successfully' };
    } catch (error) {
      throw error;
    }
  }
  static async deleteTest(test_id) {
    try {
      const test = await Test.findByIdAndDelete(test_id);
      if (!test) {
        throw new X('Test not found', 404);
      }
      return;
    } catch (error) {
      throw error;
    }
  }
};
