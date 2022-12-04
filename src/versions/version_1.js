const version1 = require('express').Router();
const staffRouter = require('../routes/staffRouter');
const AuthRouter = require('../routes/authRouter');
const patientRouter = require('../routes/patientRouter');
const prescriptionRouter = require('../routes/prescriptionRouter');
const InventoryRouter = require('../routes/inventoryRouter');
const SymptomRouter = require('../routes/symptomRouter');
const AuthService = require('../services/auth.service');

version1.use('/api/v1/staff', staffRouter);

version1.use(AuthService.protectRoute);

version1.use('/api/v1/symptoms', SymptomRouter);

version1.use('/api/v1/patients', patientRouter);

version1.use('/api/v1/inventory', InventoryRouter);

version1.use('/api/v1/prescriptions', prescriptionRouter);

module.exports = version1;
