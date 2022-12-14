const version1 = require('express').Router();
const AuthRouter = require('../routes/authRouter');
const staffRouter = require('../routes/staffRouter');
const SymptomRouter = require('../routes/symptomRouter');
const patientRouter = require('../routes/patientRouter');
const diagnosisRouter = require('../routes/diagnosisRouter');
const InventoryRouter = require('../routes/inventoryRouter');
const prescriptionRouter = require('../routes/prescriptionRouter');

version1.use('/api/v1/auth', AuthRouter);

version1.use('/api/v1/staff', staffRouter);

version1.use('/api/v1/symptoms', SymptomRouter);

version1.use('/api/v1/diagnosis', diagnosisRouter);

version1.use('/api/v1/patients', patientRouter);

version1.use('/api/v1/inventory', InventoryRouter);

version1.use('/api/v1/prescriptions', prescriptionRouter);

module.exports = version1;
