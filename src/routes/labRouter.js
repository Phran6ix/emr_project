const labRouter = require('express').Router();
const AuthService = require('../services/auth.service');
const LabController = require('../controllers/lab.controller');
const {
  HTTPCreateTest,
  HTTPGetPendingTests,
  HTTPUploadResult,
  HTTPGetAPendingTest,
  HTTPdeleteATest,
  HTTPGetLabSession,
  HTTPConcludeTest,
} = new LabController();

labRouter.use(AuthService.protectRoute);

labRouter.post('/create', HTTPCreateTest);
labRouter.get('/pending-test', HTTPGetPendingTests);
labRouter.patch('/conclude-test', HTTPConcludeTest);
labRouter.get('/pending-test/:id', HTTPGetAPendingTest);
labRouter.patch('/upload-result/:id', HTTPUploadResult);
labRouter.delete('/delete-test/:id', HTTPdeleteATest);

labRouter.get('/session/:id', HTTPGetLabSession);

module.exports = labRouter;
