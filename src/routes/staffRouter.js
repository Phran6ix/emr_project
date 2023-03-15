const staffRouter = require('express').Router();
const StaffController = require('../controllers/staff.controller');
const { protectRoute, RestrictAccess } = require('../services/auth.service');
const Staff = new StaffController();

staffRouter.route('/').post(Staff.HttpCreateStaff).get(Staff.HttpGetAllStaff);
staffRouter.use(protectRoute);

staffRouter
  .route('/status')
  .patch(Staff.HttpUpdateStaffOnlineStatus)
  .get(Staff.HTTPGetOnlineStaffs);

staffRouter
  .route('/:id')
  .patch(RestrictAccess('admin'), Staff.HttpUpdateStaff)
  .delete(RestrictAccess('admin'), Staff.HttpDeleteStaff);

staffRouter.patch('/status/:id', Staff.HTTPrevokeOrGrant);
staffRouter.get('/info/:id', Staff.HttpGetOneStaff);

module.exports = staffRouter;
