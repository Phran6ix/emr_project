require('dotenv').config();
const http = require('http');
const App = require('./app');
const Staff = require('./src/database/models/staff.model');
const BioD = require('./src/database/models/biodata.model');
const Xray = require('./src/database/models/xray.model');
const Queue = require('./src/database/models/queue.model');
const Lab = require('./src/database/models/lab-test.model');
const Test = require('./src/database/models/raw_test');
const Diagnosis = require('./src/database/models/diagnosis.model');
const DiagnosisNote = require('./src/database/models/diagnosis-note.model');
const Inventory = require('./src/database/models/inventory.model');
const PatientSession = require('./src/database/models/patient-session.model');
const PaSym = require('./src/database/models/patient-symptom.model');
const Patient = require('./src/database/models/patient.model');
const Prescript = require('./src/database/models/prescription.model');
const Symptom = require('./src/database/models/symptom.model');

const connectDb = require('./src/database/connections/connection');

async function clearDB() {
  await Staff.deleteMany();
  await BioD.deleteMany();
  await Xray.deleteMany();
  await Queue.deleteMany();
  await Lab.deleteMany();
  await Test.deleteMany();
  await Diagnosis.deleteMany();
  await DiagnosisNote.deleteMany();
  await Inventory.deleteMany();
  await PatientSession.deleteMany();
  await PaSym.deleteMany();
  await Patient.deleteMany();
  await Prescript.deleteMany();

  await Staff.create({
    username: 'Admin',
    password: 'admin001',
    role: 'admin',
    fullName: 'Main Admin',
  });

  console.log('All DONE');
}

const server = http.createServer(App);
const port = process.env.PORT || 5000;

async function Bootstrap() {
  const con = await connectDb();

  server.listen(port, () => {
    console.log(
      `emr server listening to traffic on port ${port} ${con.connection.host}`
    );
  });
}

Bootstrap();
