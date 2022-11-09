const staffRouter = require('express').Router();
const StaffController = require('../controllers/staff.controller');
const { protectRoute, RestrictAccess } = require('../services/auth.service');
const Staff = new StaffController();

staffRouter.use(protectRoute);

staffRouter
  .route('/staff')
  .post(RestrictAccess('admin'), Staff.HttpCreateStaff)
  .get(Staff.HttpGetAllStaff);

staffRouter
  .route('/staff/:id')
  .patch(RestrictAccess('admin'), Staff.HttpUpdateStaff)
  .delete(RestrictAccess('admin'), Staff.HttpDeleteStaff);

staffRouter.get('/staff/info/:id', Staff.HttpGetOneStaff);

staffRouter.patch(
  '/staff/status/:id',
  RestrictAccess('admin'),
  Staff.HttpUpdateStaffStatus
);

module.exports = staffRouter;
