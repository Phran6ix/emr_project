require('dotenv').config();
const http = require('http');
const App = require('./app');
const Staff = require('./src/database/models/staff.model');
const connectDb = require('./src/database/connections/connection');
const { create } = require('./src/database/models/staff.model');

const server = http.createServer(App);
const port = process.env.PORT || 5000;

async function createDummy() {
  const user = await Staff.create({
    username: 'admin one',
    password: 'adminpassword',
    fullName: 'My Admin Name',
    role: 'admin',
  });
  console.log(user);
  return;
}

createDummy();

async function Bootstrap() {
  const con = await connectDb();
  server.listen(port, () => {
    console.log(
      `emr server listening to traffic on port ${port} ${con.connection.host}`
    );
  });
}

Bootstrap();
