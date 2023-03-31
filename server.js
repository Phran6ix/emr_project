require('dotenv').config();
const http = require('http');
const App = require('./app');
const Staff = require('./src/database/models/staff.model');
const Symptom = require('./src/database/models/symptom.model');

const connectDb = require('./src/database/connections/connection');

async function clearDB() {
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
