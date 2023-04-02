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

  // console.log(now);
  // now.setUTCHours(10);
  const currentHours = now.getHours() * 100;
  const currentMinute = now.getMinutes();
  const currentTime = currentHours + currentMinute;

  clockIn = clockIn.split(':');
  clockOut = clockOut.split(':');

  const IntclockIn = +clockIn.join('');
  const IntclockOut = +clockOut.join('');

  // CHECK FOR BEFORE SHIFT
  if (currentTime < IntclockIn) {
    return false;
  }

  // check if the shift extends to the next day
  const nextDay = IntclockOut < IntclockIn;

  if (!nextDay) {
    if (currentTime > IntclockOut) {
      return false;
    }
  }

  //  If the shift extends to the next day
  if (nextDay) {
    if (IntclockIn >= currentTime || 0 <= IntclockOut <= currentTime) {
      return true;
    } else {
      return false;
    }
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

/*


    let signoutdate = new Date(
      new Date().toDateString() + ' ' + clockOut.join('')
    ); //new Date(setClockOut);
    console.log('clockout', signoutdate);

    signoutdate = new Date(signoutdate).setDate(signoutdate.getDate() + 1);
    console.log('nextday', signoutdate);

    const nexminute = nowTime.getHours() * 60 + nowTime.getMinutes();
    console.log('nex', nexminute);
    const signoutmin = signoutdate.getMinutes();

    console.log('min ', signoutmin, 'nex', nexminute);
    if (nexminute >= signoutmin) {
      return false;
    }

  STEP1: Check for the next day state
  STEP2: if the state is true, add 24 to the sign out time

*/
