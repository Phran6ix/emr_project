const jwt = require('jsonwebtoken');

async function signToken(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET);
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
    PId: this.PId,
  };
}

function dumbBio() {
  return {
    patient_id: this.patient_id,
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

module.exports = {
  dumbBio,
  signToken,
  dumbStaff,
  verifyToken,
  dumbPatient,
};
