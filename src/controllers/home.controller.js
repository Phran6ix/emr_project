const serverResponse = require('../utils/response');

function home(req, res) {
  return serverResponse(res, 200, 'welcome to EMR API');
}

function undefinedRoutes(req, res, next) {
  return serverResponse(
    res,
    404,
    `can't find ${req.originalUrl} on this server, check the HTTP method and try again`
  );
}

module.exports = {
  home,
  undefinedRoutes,
};
