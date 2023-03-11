const Session = require('../database/models/patient-session.model');
const Lab = require('../database/models/lab-test.model');
const X_ray = require('../database/models/xray.model');
const Prescription = require('../database/models/prescription.model');
const Patient = require('../database/models/patient.model');
const X = require('../exceptions/operational.exception');
const PatientSymptom = require('../database/models/patient-symptom.model');
const Diagnosis = require('../database/models/diagnosis.model');

module.exports = class SessionService {
  static async getAllSession() {
    try {
      const sessions = await Session.find().populate({
        path: 'patient',
        select: 'name dob PID',
      });

      return sessions;
    } catch (error) {
      throw error;
    }
  }

  static async getSession(filter) {
    try {
      const labs = new Promise((res) => {
        res(
          Lab.findOne(filter)
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .select('title description paid doctor patient')
        );
      });
      const xrays = new Promise((res) => {
        res(
          X_ray.findOne(filter)
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .select('title description paid doctor patient')
        );
      });

      const symptoms = new Promise((res) => {
        res(
          PatientSymptom.findOne(filter)
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
        );
      });

      const prescription = new Promise((res) => {
        res(
          Prescription.findOne(filter)
            .populate({
              path: 'doctor',
              select: 'fullName role',
            })
            .populate({
              path: 'patient',
              select: 'name dob PID',
            })
            .select('title description paid doctor patient')
        );
      });

      const diagnosis = new Promise((res) => {
        res(
          Diagnosis.findOne(filter).populate({
            path: 'patient',
            select: 'name dob PID',
          })
        );
      });

      const response = await Promise.all([
        labs,
        xrays,
        symptoms,
        prescription,
        diagnosis,
      ]);

      const data = {
        Symptoms: response[2],
        diagnosis: response[4],
        'Lab Test': response[0],
        'X-ray': response[1],
        prescription: response[3],
      };

      return { data };
    } catch (error) {
      throw error;
    }
  }
};
