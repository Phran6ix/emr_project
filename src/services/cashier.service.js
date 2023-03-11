const Lab = require('../database/models/lab-test.model');
const Xray = require('../database/models/xray.model');
const Prescription = require('../database/models/prescription.model');
const { findByIdAndUpdate } = require('../database/models/lab-test.model');

module.exports = class CashierService {
  static async getAllPendingLabTestAndXray() {
    try {
      const labs = await Lab.find({ concluded: false, paid: false });
      const xrays = await Xray.find({ concluded: false, paid: false });
      const prescription = await Prescription.find({ paid: false });

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
