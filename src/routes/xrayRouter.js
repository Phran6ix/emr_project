const XrayRouter = require('express').Router();
const AuthService = require('../services/auth.service');
const XRayController = require('../controllers/xray.controller');
const {
  HTTPCreateTest,
  HTTPGetPendingTests,
  HTTPUploadResult,
  HTTPGetAPendingTest,
  HTTPdeleteATest,
  HTTPConcludeATest,
  HTTPGetConcludedTest,
  HTTPGetXraySession,
} = new XRayController();

XrayRouter.use(AuthService.protectRoute);

XrayRouter.post('/create', HTTPCreateTest);
XrayRouter.get('/pending-test', HTTPGetPendingTests);
XrayRouter.get('/done-tests', HTTPGetConcludedTest);
XrayRouter.patch('/conclude-test', HTTPConcludeATest);

XrayRouter.get('/pending-test/:id', HTTPGetAPendingTest);
XrayRouter.get('/session/:id', HTTPGetXraySession);
XrayRouter.patch('/upload-result/:id', HTTPUploadResult);
XrayRouter.delete('/delete-test/:id', HTTPdeleteATest);

module.exports = XrayRouter;
