const { findByIdAndDelete } = require('../database/models/lab-test.model');
const X_Ray = require('../database/models/xray.model');
const X = require('../exceptions/operational.exception');

module.exports = class TestService {
  static async createTest(payload) {
    try {
      const doc = await X_Ray.create(payload);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingTests() {
    try {
      const doc = await X_Ray.find({ paid: true, concluded: false })
        .populate({ path: 'patient', select: 'name dob PID' })
        .populate({ path: 'doctor', select: 'fullName role' })
        .populate({
          path: 'test',
          select: '-__v',
        });

      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAPendingTest(filter) {
    try {
      const doc = await X_Ray.findById(filter)
        .populate('patient', 'name dob PID')
        .populate('doctor', 'fullName role ')
        .populate({
          path: 'test',
          select: '-__v',
        });
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
      const test = await X_Ray.findOneAndUpdate(filter, payload);
      return test;
    } catch (err) {
      throw err;
    }
  }

  static async deleteTest(filter) {
    try {
      const doc = await X_Ray.findByIdAndDelete(filter);
      if (!doc) {
        return new X('Not found', 404);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getXraySession(session_id) {
    try {
      const session = await Session.findById(session_id)
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .select('status createdAt patient');

      const docs = await X_Ray.find({ sessionID: session_id })
        .populate({
          path: 'test',
          select: '-__v',
        })
        .select('-__v');

      if (!docs || !session) {
        throw new X('Documents not found', 404);
      }
      return {
        session,
        lab: docs,
      };
    } catch (error) {
      throw error;
    }
  }
};
