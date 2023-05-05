const Session = require('../database/models/patient-session.model');
const Patient = require('../database/models/patient.model');
const Symptom = require('../database/models/patient-symptom.model');
const Prescription = require('../database/models/prescription.model');
const Diagnosis = require('../database/models/diagnosis.model');
const Lab = require('../database/models/lab-test.model');
const X_ray = require('../database/models/xray.model');

const X = require('../exceptions/operational.exception');

async function getHistory(type, filter) {
  let testquery;
  let symptomquery;
  let prescriptionquery;

  if (type == 'PID') {
    testquery = { concluded: true, patient: filter };
    symptomquery = { patient: filter };
    prescriptionquery = { dispersed: true, patient: filter };
  } else if (type == 'session') {
    testquery = { concluded: true, sessionID: filter };
    symptomquery = { sessionID: filter };
    prescriptionquery = { dispersed: true, sessionID: filter };
  }

  const labs = new Promise((res) => {
    res(
      Lab.find(testquery)
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
        .select('-_id -__v')
    );
  });
  const xrays = new Promise((res) => {
    res(
      X_ray.find(testquery)
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
        .select('-_id -__v')
    );
  });

  const symptoms = new Promise((res) => {
    res(
      Symptom.find(symptomquery)
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
      Prescription.find(prescriptionquery)
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
        .select('-_id -__v')
    );
  });

  const diagnosis = new Promise((res) => {
    res(
      Diagnosis.find(symptomquery)
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
}
class HistoryService {
  static async getPatientHistory(sessionID) {
    try {
      const history = await getHistory('session', sessionID);
      return history;
    } catch (error) {
      throw error;
    }
  }
  static async getHistoryWithPID(PID) {
    try {
      const patient = await Patient.findOne({ PID });
      if (!patient) {
        throw new X('Patient with this patient number not found', 404);
      }

      const history = await getHistory('PID', patient.id);
      return history;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HistoryService;
