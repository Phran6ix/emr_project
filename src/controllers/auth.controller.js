const serverResponse = require('../utils/response');
const AuthService = require('../services/auth.service');
const { signToken, dumbStaff } = require('../utils/helper');

const now = new Date();

// console.log(now);

console.log(now.getTimezoneOffset());
console.log(now, now.getHours());
const currentHours = (now.getHours() + 1) * 100;
const currentMinute = now.getMinutes();
const currentTime = currentHours + currentMinute;
console.log(currentTime);

module.exports = class AuthController {
  async HttpLoginStaff(req, res, next) {
    try {
      const resp = await AuthService.login(req.body);
      return serverResponse(
        res,
        200,
        dumbStaff.call(resp),
        { currentTime, now },
        `Bearer ${await signToken(resp._id)}`
      );
    } catch (error) {
      next(error);
    }
  }
};
