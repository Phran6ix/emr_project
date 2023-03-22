const TestService = require('../services/raw_test');
const serverResponse = require('../utils/response');

module.exports = class TestController {
  async HTTPCreateTest(req, res, next) {
    try {
      const test = await TestService.CreateTest(req.body);

      return serverResponse(res, 201, test);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetAllTests(req, res, next) {
    try {
      const tests = await TestService.GetAllTest();
      return serverResponse(res, 200, tests);
    } catch (error) {
      next(error);
    }
  }

  async HTTPGetATest(req, res, next) {
    try {
      const test = await TestService.getATest(req.params.id);
      return serverResponse(res, 200, test);
    } catch (error) {
      next(error);
    }
  }

  async HTTPUpdateTest(req, res, next) {
    try {
      const test = await TestService.updateAtest(req.params.id, req.body);
      return serverResponse(res, 200, test);
    } catch (error) {
      next(error);
    }
  }

  async HTTPDeleteTest(req, res, next) {
    try {
      await TestService.deleteTest(req.params.id);
      return serverResponse(res, 204, {});
    } catch (error) {
      next(error);
    }
  }
};
