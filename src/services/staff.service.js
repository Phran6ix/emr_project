const Staff = require('../database/models/staff.model');
const X = require('../exceptions/operational.exception');
const { dumbStaff } = require('../utils/helper');
// const serverResponse = require('../utils/response');

module.exports = class StaffService {
  static async CreateStaff(payload) {
    try {
      const doc = await Staff.create(payload);
      return dumbStaff.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async deleteStaff(id) {
    try {
      const doc = await Staff.findByIdAndDelete(id);
      if (!doc) throw new X('no doc found with the provided id', 404);
      return 'deleted';
    } catch (error) {
      throw error;
    }
  }

  static async getOneStaff(id) {
    try {
      const doc = await Staff.findById(id);
      if (!doc) throw new X(' no doc found with the provided id', 404);
      return dumbStaff.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async getAllStaff() {
    try {
      let docs = await Staff.find();
      docs = docs.map((doc) => dumbStaff.call(doc));
      return docs;
    } catch (error) {
      throw error;
    }
  }

  static async updateStaff(id, payload) {
    try {
      const { username, password, role, fullName } = payload;
      const doc = await Staff.findByIdAndUpdate(id, payload);
      if (!doc) throw new X(' no doc found with the provided id', 404);
      return dumbStaff.call(doc);
    } catch (error) {
      throw error;
    }
  }

  static async updateStaffStatus(id, query) {
    try {
      if (!query.status) throw new X('provide a query status action', 400);
      const doc = await Staff.findByIdAndUpdate(id, { status: query.status });
      if (!doc) throw new X(' no doc found with the provided id', 404);
      return dumbStaff.call(doc);
    } catch (error) {
      throw error;
    }
  }

  // static async
};
