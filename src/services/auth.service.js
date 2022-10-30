const Staff = require('../database/models/staff.model');
const X = require('../exceptions/operational.exception');
const { signToken } = require('../utils/helper');
const serverResponse = require('../utils/response');

module.exports = class AuthService {
  static async protectRoute(req, res, next) {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
      if (!token)
        throw new X('you are not logged in , kindly login to access', 401);

      const payload = await verify(token, process.env.JWT_SECRET);
      const user = await Staff.findById(payload.id, {
        _id: true,
        role: true,
      });

      if (!user) throw new X('there is no user with the provided token', 401);

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  }

  static async login(payload) {
    try {
      if (!payload.username || !payload.password)
        throw new X('username and password are required', 400);
      const user = await Staff.findOne({ username: payload.username });
      if (
        !user ||
        !(await user.comparePassword(payload.password, user.password))
      )
        throw new X('invalid username or password', 403);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async restrictLogin(...roles) {
    return (req, res, next) => {
      if (roles.includes(req.user.role))
        return next(
          new X(
            `Access restricted, you're not allowed to perform this action`,
            409
          )
        );
    };
  }
};
