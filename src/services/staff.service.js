const Staff = require('../database/models/staff.model');
// const serverResponse = require('../utils/response');

module.exports = class StaffService {
  static async CreateStaff(payload) {
    try {
      const doc = await Staff.create(payload);
      return doc;
    } catch (error) {
      throw error;
    }
  }
};
