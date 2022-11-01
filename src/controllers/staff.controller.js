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

  async HttpDeleteStaff(req, res, next) {
    try {
      const resp = await StaffService.deleteStaff(req.params.id);
      return serverResponse(res, 200, 'Doc deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async HttpGetOneStaff(req, res, next) {
    try {
      const resp = await StaffService.getOneStaff(req.params.id);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpUpdateStaff(req, res, next) {
    try {
      const resp = await StaffService.updateStaff(req.params.id, req.body);
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpGetAllStaff(req, res, next) {
    try {
      const resp = await StaffService.getAllStaff();
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }

  async HttpUpdateStaffStatus(req, res, next) {
    try {
      const resp = await StaffService.HttpUpdateStaffStatus(
        req.params.id,
        req.query
      );
      return serverResponse(res, 200, resp);
    } catch (error) {
      next(error);
    }
  }
};
