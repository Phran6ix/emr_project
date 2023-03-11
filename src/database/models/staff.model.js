const bcrypt = require('bcrypt');
const Mongoose = require('mongoose');

const staffSchema = Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, 'kindly provide staff username'],
    },

    password: {
      type: String,
      required: [true, 'kindly provide staff username'],
    },

    role: {
      type: String,
      enum: [
        'admin',
        'receptionist',
        'doctor',
        'pharmacist',
        'cashier',
        'xray',
        'lab',
      ],
      required: [true, 'kindly provide staff role'],
    },

    fullName: {
      type: String,
      required: true,
    },

    online: {
      type: Boolean,
      default: true,
    },

    status: {
      type: Boolean,
      default: true,
    },

    clockIn: {
      type: Date,
    },

    clockOut: {
      type: Date,
    },
  },
  {
    timestamps: true,

    toObject: {
      virtuals: true,
    },

    toJSON: {
      virtuals: true,
    },
  }
);
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

staffSchema.methods.comparePassword = async function (
  userPassword,
  OriginalPassword
) {
  return await bcrypt.compare(userPassword, OriginalPassword);
};

module.exports = Mongoose.model('Staff', staffSchema);
