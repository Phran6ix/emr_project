const { findByIdAndDelete } = require('../database/models/lab-test.model');
const X_Ray = require('../database/models/xray.model');
const Inventory = require('../database/models/inventory.model');
const Session = require('../database/models/patient-session.model');
const Queue = require('../database/models/queue.model');
const X = require('../exceptions/operational.exception');

module.exports = class TestService {
  static async createTest(payload) {
    try {
      const test = await Inventory.findById(payload.test);
      if (test.quantity < 1) {
        throw new X('Out of Stock', 400);
      }

      const doc = await X_Ray.create(payload);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingTests() {
    try {
      const doc = await X_Ray.find({
        paid: true,
        concluded: false,
        completed: false,
      })
        .populate({ path: 'patient', select: '-__v' })
        .populate({ path: 'doctor', select: '-__v -password' })
        .populate({
          path: 'test',
          select: '-__v',
        });

      const patient = doc.map((document) => {
        console.log(document);
        return {
          patient: { ...document.patient._doc },
          session: document.sessionID,
        };
      });

      const filterPatient = patient.filter((item, index) => {
        return (
          index ===
          patient.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });

      return filterPatient;
    } catch (err) {
      throw err;
    }
  }

  static async getAPendingTest(filter) {
    try {
      const doc = await X_Ray.findOne({
        patient: filter,
        concluded: false,
        completed: false,
      })
        .populate({ path: 'patient', select: '-__v ' })
        .populate({ path: 'doctor', select: '-__v -password' })
        .populate({
          path: 'test',
          select: '-__v -_id',
        });
      if (!doc) {
        return new X('Not found', 404);
      }
    } catch (error) {
      throw error;
    }
  }
  static async uploadResult(filter, payload) {
    try {
      const test = await X_Ray.findByIdAndUpdate(filter, payload);
      if (!test) {
        throw new X('Document not found', 404);
      }
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
        .populate({
          path: 'doctor',
          select: 'fullName role ',
        })
        .populate({
          path: 'patient',
          select: 'name ',
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

  static async getConcludedTests(doctor) {
    try {
      const tests = await X_Ray.find({
        doctor,
        concluded: true,
        completed: false,
      })
        .populate({
          path: 'doctor',
          select: 'fullName role ',
        })
        .populate({
          path: 'patient',
          select: 'name ',
        })
        .select('-__v');

      const patient = tests.map((document) => {
        return {
          ...document.patient._doc,
          session: document.sessionID,
        };
      });

      const filterPatient = patient.filter((item, index) => {
        return (
          index ===
          patient.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });

      return filterPatient;
    } catch (error) {
      throw error;
    }
  }

  static async completeATest(sessionID) {
    try {
      const concludedTest = await X_Ray.find({ sessionID });

      if (concludedTest.length < 1) {
        throw new X('Tests does not exists in this session', 404);
      }

      concludedTest.forEach(async (test) => {
        test.completed = true;
        await test.save();
      });

      const queue = await Queue.findOne({
        session: concludedTest[0].sessionID,
      });
      if (!queue) {
        throw new X('An Error occured', 400);
      }
      queue.attendedTo = true;
      await queue.save();

      return concludedTest;
    } catch (error) {
      throw error;
    }
  }
};
