const TestRouter = require('express').Router();
const Auth = require('../services/auth.service');
const TestController = require('../controllers/raw_test.controller');

const {
  HTTPCreateTest,
  HTTPDeleteTest,
  HTTPGetATest,
  HTTPGetAllTests,
  HTTPUpdateTest,
} = new TestController();

TestRouter.use(Auth.protectRoute);

TestRouter.route('/').post(HTTPCreateTest).get(HTTPGetAllTests);
TestRouter.route('/:id')
  .get(HTTPGetATest)
  .patch(HTTPUpdateTest)
  .delete(HTTPDeleteTest);

module.exports = TestRouter;
