const Lab = require('../database/models/lab-test.model');
const Xray = require('../database/models/xray.model');
const Prescription = require('../database/models/prescription.model');
const { findByIdAndUpdate } = require('../database/models/lab-test.model');

module.exports = class CashierService {
  static async getListOfPatient() {
    try {
      const labPatient = new Promise((res) => {
        res(
          Lab.find({ paid: false })
            .populate({
              path: 'patient',
              select: 'name _id',
            })
            .select('patient -_id')
        );
      });

      const xrayPatient = new Promise((res) => {
        res(
          Xray.find({ paid: false })
            .populate({
              path: 'patient',
              select: 'name _id',
            })
            .select('patient -_id')
        );
      });

      const prescription = new Promise((res) => {
        res(
          Prescription.find({ paid: false })
            .populate({
              path: 'patient',
              select: 'name',
            })
            .select('patient -_id')
        );
      });

      const RawPatient = await Promise.all([
        labPatient,
        xrayPatient,
        prescription,
      ]);

      const patientArray = [
        ...RawPatient[0],
        ...RawPatient[1],
        ...RawPatient[2],
      ];

      let patient;

      patient = patientArray.map((patient) => {
        return patient.patient;
      });

      const uniqueData = patient.filter((item, index) => {
        return (
          index ===
          patient.findIndex((obj) => {
            return JSON.stringify(obj) === JSON.stringify(item);
          })
        );
      });

      return uniqueData;
    } catch (error) {
      throw error;
    }
  }

  static async getPatientLabTestAndXray(query) {
    try {
      const labs = await Lab.find({ ...query, paid: false });
      const xrays = await Xray.find({ ...query, paid: false });
      const prescription = await Prescription.find({ ...query, paid: false });

      const response = {
        test: { labs, xrays },
        prescription,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async approveAPayment(filter, type) {
    let test;
    try {
      switch (type) {
        case 'lab':
          test = await Lab.findByIdAndUpdate(filter, { paid: true });
          break;
        case 'x-ray':
          test = await Xray.findByIdAndUpdate(filter, { paid: true });
          break;
        case 'prescription':
          test = await Prescription.findByIdAndUpdate(filter, { paid: true });
          break;
        default:
          throw Error('Invalid input');
      }
      return test;
    } catch (error) {
      throw error;
    }
  }
};
