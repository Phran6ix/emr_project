function serverResponse(res, statusCode = 200, data, token) {
  return res.status(statusCode).json({
    success: true,
    data,
    token,
  });
}

module.exports = serverResponse;
