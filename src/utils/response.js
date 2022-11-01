function serverResponse(res, statusCode, data, token) {
  const success = `${statusCode}`.startsWith('2') ? true : false;
  return res.status(statusCode).json({
    success: true,
    data,
    token,
  });
}

module.exports = serverResponse;
