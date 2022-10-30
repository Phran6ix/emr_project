const staffRouter = require('express').Router();
const StaffController = require('../controllers/staff.controller');

const { HttpCreateStaff } = new StaffController();

staffRouter.post('/staff', HttpCreateStaff);

module.exports = staffRouter;
