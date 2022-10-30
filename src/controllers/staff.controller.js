const serverResponse = require('../utils/response');
const StaffService = require('../services/staff.service');

module.exports = class StaffController {
  async HttpCreateStaff(req, res, next) {
    try {
      const resp = await StaffService.CreateStaff(req.body);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
};
