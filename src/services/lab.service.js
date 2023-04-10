const LabTest = require('../database/models/lab-test.model');
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

      const doc = await LabTest.create(payload);
      test.quantity -= 1;
      await test.save();
      return doc;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingTests() {
    try {
      const doc = await LabTest.find({
        paid: true,
        concluded: false,
        completed: false,
      })
        .populate({ path: 'patient', select: '-__v ' })
        .populate({ path: 'doctor', select: '-__v -password' })
        .populate({
          path: 'test',
          select: '-__v -_id',
        });

      const patient = doc.map((document) => {
        return { ...document.patient._doc };
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
      const doc = await LabTest.find({
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
      return doc;
    } catch (error) {
      throw error;
    }
  }
  static async uploadResult(filter, payload) {
    try {
      const test = await LabTest.findByIdAndUpdate(filter, payload);
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
      const doc = await LabTest.findByIdAndDelete(filter);
      return;
    } catch (error) {
      throw error;
    }
  }

  static async getLabSession(session_id) {
    try {
      const session = await Session.findById(session_id)
        .populate({
          path: 'patient',
          select: 'name dob PID',
        })
        .select('status createdAt patient _id');

      const docs = await LabTest.find({ sessionID: session_id })
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

  static async getConcludedTests() {
    try {
      const tests = await LabTest.find({ concluded: true, completed: false })
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
      console.log(tests);
      return tests;
    } catch (error) {
      throw error;
    }
  }

  static async concludeATest(id) {
    try {
      const concludetest = await LabTest.findByIdAndUpdate(id, {
        completed: true,
      });
      if (!concludetest) {
        throw new X('This test does not exist, check the id', 404);
      }

      const queue = await Queue.findOne({ session: concludetest.sessionID });
      queue.attendedTo = true;
      await queue.save();
      // if (concludetest.completed) {
      //   throw new X('This test has already been concluded', 400);
      // }

      return concludetest;
    } catch (error) {
      throw error;
    }
  }
};
