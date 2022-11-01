const staffRouter = require('express').Router();
const StaffController = require('../controllers/staff.controller');
const { protectRoute, RestrictAccess } = require('../services/auth.service');

const {
  HttpCreateStaff,
  HttpGetAllStaff,
  HttpGetOneStaff,
  HttpUpdateStaff,
  HttpDeleteStaff,
  HttpUpdateStaffStatus,
} = new StaffController();

staffRouter.use(protectRoute);

staffRouter
  .route('/staff')
  .post(RestrictAccess('admin'), HttpCreateStaff)
  .get(HttpGetAllStaff);

staffRouter
  .route('/staff/:id')
  .patch(RestrictAccess('admin'), HttpUpdateStaff)
  .delete(RestrictAccess('admin'), HttpDeleteStaff);

staffRouter.get('/staff/info/:id', HttpGetOneStaff);

staffRouter.patch(
  '/staff/status/:id',
  RestrictAccess('admin'),
  HttpUpdateStaffStatus
);

module.exports = staffRouter;
