const version1 = require('express').Router();
const staffRouter = require('../routes/staffRouter');
const AuthRouter = require('../routes/authRouter');
const patientRouter = require('../routes/patientRouter');
const prescriptionRouter = require('../routes/prescriptionRouter');
const InventoryRouter = require('../routes/inventoryRouter');
version1.use('/api/v1/auth', AuthRouter);

version1.use('/api/v1/staff', staffRouter);

version1.use('/api/v1/patients', patientRouter);

version1.use('/api/v1/prescriptions', prescriptionRouter);

version1.use('/api/v1/inventory', InventoryRouter);

module.exports = version1;
