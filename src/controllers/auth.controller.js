const AuthService = require('../services/auth.service');
const { signToken, dumbStaff } = require('../utils/helper');
const serverResponse = require('../utils/response');

module.exports = class AuthController {
  async HttpLoginStaff(req, res, next) {
    try {
      console.log(req.body);
      const resp = await AuthService.login(req.body);
      return serverResponse(
        res,
        200,
        dumbStaff.call(resp),
        await signToken(resp._id)
      );
    } catch (error) {
      next(error);
    }
  }
};
