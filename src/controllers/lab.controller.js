const LabService = require('../services/lab.service');
const serverResponse = require('../utils/response');

module.exports = class LabController {
  async HTTPCreateTest(req, res, next) {
    try {
      const data = { ...req.body, doctor: req.user.id };
      const resp = await LabService.createTest(data);
      serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }
  async HTTPGetPendingTests(req, res, next) {
    try {
      let response = await LabService.getAllPendingTests();

      serverResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetAPendingTest(req, res, next) {
    try {
      const test = await LabService.getAPendingTest(req.params.id);
      serverResponse(res, 200, test);
    } catch (error) {
      next(error);
    }
  }

  async HTTPUploadResult(req, res, next) {
    try {
      const response = await LabService.uploadResult(
        { id: req.params.id },
        { result: req.body.result, concluded: true }
      );
      serverResponse(res, 200, { message: 'Upload successful' });
    } catch (error) {
      next(error);
    }
  }

  async HTTPdeleteATest(req, res, next) {
    try {
      await LabService.deleteTest(req.params.id);
      serverResponse(res, 204, '');
    } catch (error) {
      next(error);
    }
  }
};
