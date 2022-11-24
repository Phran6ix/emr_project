const staffRouter = require('express').Router();
const StaffController = require('../controllers/staff.controller');
const { protectRoute, RestrictAccess } = require('../services/auth.service');
const Staff = new StaffController();

staffRouter.use(protectRoute);

staffRouter
  .route('/')
  .post(RestrictAccess('admin'), Staff.HttpCreateStaff)
  .get(Staff.HttpGetAllStaff);

staffRouter
  .route('/:id')
  .patch(RestrictAccess('admin'), Staff.HttpUpdateStaff)
  .delete(RestrictAccess('admin'), Staff.HttpDeleteStaff);

staffRouter.get('/info/:id', Staff.HttpGetOneStaff);

staffRouter.patch(
  '/status/:id',
  RestrictAccess('admin'),
  Staff.HttpUpdateStaffStatus
);

module.exports = staffRouter;
