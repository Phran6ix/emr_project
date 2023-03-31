const jwt = require('jsonwebtoken');

async function signToken(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

async function verifyToken(token) {
  return await jwt.verify(token, process.env.JWT_SECRET);
}

function dumbStaff() {
  return {
    staff_id: this._id,
    role: this.role,
    username: this.username,
    firstName: this.firstName,
    fullName: this.fullName,
    clockIn: this.clockIn,
    clockOut: this.clockOut,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
}

function dumbPatient() {
  return {
    patient_id: this._id,
    name: this.name,
    dob: this.dob,
    phoneNumber: this.phoneNumber,
    email: this.email,
    PID: this.PID,
  };
}

function dumbBio() {
  return {
    patient: this.patient,
    bio_id: this._id,
    sex: this.sex,
    age: this.age,
    address: this.address,
    genotype: this.genotype,
    bloodGroup: this.bloodGroup,
    occupation: this.occupation,
    registration: this.registration,
  };
}

function checkStaffClock(clockIn, clockOut) {
  const now = new Date();
  const currentHours = now.getHours() * 100;
  const currentMinute = now.getMinutes();
  const currentTime = currentHours + currentMinute;

  clockIn = +clockIn.split(':').join('');
  clockOut = +clockOut.split(':').join('');

  if (currentTime > clockOut || currentTime < clockIn) {
    return false;
  }
  return true;
}

module.exports = {
  dumbBio,
  signToken,
  dumbStaff,
  verifyToken,
  dumbPatient,
  checkStaffClock,
};
