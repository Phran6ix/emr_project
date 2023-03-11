const XRayService = require('../services/xray.service');
const serverResponse = require('../utils/response');

module.exports = class LabController {
  async HTTPCreateTest(req, res, next) {
    try {
      const data = { ...req.body, doctorId: req.user.id };
      const resp = await XRayService.createTest(data);
      serverResponse(res, 201, resp);
    } catch (error) {
      next(error);
    }
  }
  async HTTPGetPendingTests(req, res, next) {
    try {
      const response = await XRayService.getAllPendingTests();
      serverResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetAPendingTest(req, res, next) {
    try {
      const response = await XRayService.getAPendingTest(req.params.id);
      serverResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  }

  async HTTPUploadResult(req, res, next) {
    try {
      const response = await XRayService.uploadResult(
        { id: req.params.id },
        { result: req.body.result, concluded: true }
      );
      serverResponse(res, 200, { message: 'Upload Successful' });
    } catch (error) {
      next(error);
    }
  }

  async HTTPdeleteATest(req, res, next) {
    try {
      await XRayService.deleteTest(req.params.id);
      serverResponse(res, 204, '');
    } catch (error) {
      next(error);
    }
  }
};
