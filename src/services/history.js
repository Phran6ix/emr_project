const Session = require('../database/models/patient-session.model');
const Symptom = require('../database/models/patient-symptom.model');
const Prescription = require('../database/models/prescription.model');
const Diagnosis = require('../database/models/diagnosis.model');
const Lab = require('../database/models/lab-test.model');
const X_ray = require('../database/models/xray.model');

class HistoryService {
  static async getPatientHistory(sessionID) {
    try {
      const labs = new Promise((res) => {
        res(
          Lab.find({ concluded: true, sessionID })
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .populate({
              path: 'test',
            })
            .select('title description paid doctor patient')
        );
      });
      const xrays = new Promise((res) => {
        res(
          X_ray.find({ concluded: true, sessionID })
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .populate({
              path: 'test',
            })
            .select('title description paid doctor patient')
        );
      });

      const symptoms = new Promise((res) => {
        res(
          Symptom.find({ sessionID })
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .populate({
              path: 'symptom',
            })
        );
      });

      const prescription = new Promise((res) => {
        res(
          Prescription.find({ sessionID, dispersed: true })
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .populate({
              path: 'drugId',
            })
            .select('title description paid doctor patient quantity')
        );
      });

      const diagnosis = new Promise((res) => {
        res(
          Diagnosis.find({ sessionID })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .populate({
              path: 'diagnosis',
              select: 'title description',
            })
        );
      });

      const result = await Promise.all([
        diagnosis,
        symptoms,
        prescription,
        labs,
        xrays,
      ]);

      let returnObj;
      let totalPrice = 0;

      returnObj = {
        diagnosis: result[0],
        symptoms: result[1],
        prescription: result[2],
        tests: result[3],
        xrays: result[4],
      };

      returnObj.prescription.forEach((drug) => {
        return (totalPrice += drug.quantity * drug.drugId.price);
      });

      returnObj.tests.forEach((test) => {
        return (totalPrice += test.test.price);
      });

      returnObj.totalPrice = totalPrice;

      return returnObj;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HistoryService;
