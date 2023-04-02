const serverResponse = require('../utils/response');
const AuthService = require('../services/auth.service');
const { signToken, dumbStaff } = require('../utils/helper');

const now = new Date();

// console.log(now);
// now.setUTCHours(10);
const currentHours = now.getHours() * 100;
const currentMinute = now.getMinutes();
const currentTime = currentHours + currentMinute;

module.exports = class AuthController {
  async HttpLoginStaff(req, res, next) {
    try {
      const resp = await AuthService.login(req.body);
      return serverResponse(
        res,
        200,
        dumbStaff.call(resp),
        currentTime,
        `Bearer ${await signToken(resp._id)}`
      );
    } catch (error) {
      next(error);
    }
  }
};
