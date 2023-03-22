const cashierRoute = require('express').Router();
const AuthService = require('../services/auth.service');
const CashierController = require('../controllers/cashier.controller');

const {
  HTTPApprovePending,
  HTTPgetPendingTestsAndPrescription,
  HTTPGetPatientList,
  HTTPGetDoctorsPatient,
} = new CashierController();

cashierRoute.use(AuthService.protectRoute);

cashierRoute.get('/list', HTTPGetPatientList);
cashierRoute.get('/doctor/patient/list', HTTPGetDoctorsPatient);
cashierRoute.get('/pending', HTTPgetPendingTestsAndPrescription);
cashierRoute.patch('/approve/payment/:id', HTTPApprovePending);

module.exports = cashierRoute;
