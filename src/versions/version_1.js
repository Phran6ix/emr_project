const version1 = require('express').Router();
const AuthRouter = require('../routes/authRouter');
const staffRouter = require('../routes/staffRouter');
const SymptomRouter = require('../routes/symptomRouter');
const patientRouter = require('../routes/patientRouter');
const diagnosisRouter = require('../routes/diagnosisRouter');
const InventoryRouter = require('../routes/inventoryRouter');
const prescriptionRouter = require('../routes/prescriptionRouter');
const labRouter = require('../routes/labRouter');
const XrayRouter = require('../routes/xrayRouter');
const queueRouter = require('../routes/queueRouter');
const cashierRoute = require('../routes/cashierRoute');
const sessionRoute = require('../routes/sessionRoute');
const RawSymptomRoute = require('../routes/rawSymptomsRoute');

version1.use('/api/v1/auth', AuthRouter);

version1.use('/api/v1/staff', staffRouter);

version1.use('/api/v1/patient/symptoms', SymptomRouter);

version1.use('/api/v1/diagnosis', diagnosisRouter);

version1.use('/api/v1/patients', patientRouter);

version1.use('/api/v1/inventory', InventoryRouter);

version1.use('/api/v1/prescriptions', prescriptionRouter);

version1.use('/api/v1/lab', labRouter);

version1.use('/api/v1/xray', XrayRouter);

version1.use('/api/v1/queue', queueRouter);

version1.use('/api/v1/cashier', cashierRoute);

version1.use('/api/v1/session', sessionRoute);

version1.use('/api/v1/symptom', RawSymptomRoute);
module.exports = version1;
