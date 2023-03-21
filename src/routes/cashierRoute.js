const cashierRoute = require('express').Router();
const AuthService = require('../services/auth.service');
const CashierController = require('../controllers/cashier.controller');

const {
  HTTPApprovePending,
  HTTPgetPendingTestsAndPrescription,
  HTTPGetPatientList,
} = new CashierController();

cashierRoute.use(AuthService.protectRoute);

cashierRoute.get('/list', HTTPGetPatientList);
cashierRoute.get('/pending', HTTPgetPendingTestsAndPrescription);
cashierRoute.patch('/payment/update/:id', HTTPApprovePending);

module.exports = cashierRoute;
