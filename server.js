require('dotenv').config();
const http = require('http');
const App = require('./app');
const Staff = require('./src/database/models/staff.model');
const Bio = require('./src/database/models/biodata.model');
const DiaN = require('./src/database/models/diagnosis-note.model');
const Inv = require('./src/database/models/inventory.model');
const Dia = require('./src/database/models/diagnosis.model');
const lab = require('./src/database/models/lab-test.model');
const Sess = require('./src/database/models/patient-session.model');
const Synm = require('./src/database/models/patient-symptom.model');
const Pati = require('./src/database/models/patient.model');
const Pres = require('./src/database/models/prescription.model');
const Que = require('./src/database/models/queue.model');
const Test = require('./src/database/models/raw_test');
const Sympt = require('./src/database/models/symptom.model');
const xray = require('./src/database/models/xray.model');

const connectDb = require('./src/database/connections/connection');

// async function clearDB() {
//   await Staff.deleteMany();
//   await Bio.deleteMany();
//   await Dia.deleteMany();
//   await DiaN.deleteMany();
//   await Inv.deleteMany();
//   await lab.deleteMany();
//   await Sess.deleteMany();
//   await Synm.deleteMany();
//   await Pati.deleteMany();
//   await Pres.deleteMany();
//   await Que.deleteMany();
//   await Test.deleteMany();
//   await Sympt.deleteMany();
//   await xray.deleteMany();

//   await Staff.create({
//     username: 'mainadmin',
//     password: 'admin001',
//     role: 'admin',
//     fullName: 'Main Admin',
//     clockIn: '00:00',
//     clockOut: '23:59',
//   });

//   console.log('All DONE');
// }

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
