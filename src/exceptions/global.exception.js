//myke_ Awoniran

function _response(res, code, message) {
  return res.status(code || 500).json({
    success: false,
    message,
  });
}

function DuplicateError(res, err) {
  const message = `Duplicate value ${Object.entries(
    err.keyValue
  )} already exist, try another value`;
  _response(res, 400, message);
}

function ValidationError(res, err) {
  const message = `validation failed ${Object.values(err.errors).map(
    (_) => _.message
  )}`;
  _response(res, 400, message);
}

function CastError(res, err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  _response(res, 400, message);
}

function MalformError(res) {
  const message = `you're not logged in, kindly log in to access `;
  _response(res, 400, message);
}

function TokenExpireError(res, err) {
  const message = `${err}`;
  _response(res, 400, message);
}

function HandleProdError(res, err, next) {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const { ...error } = err;
  if (error.isOperational) return _response(res, err.statusCode, err.message);
  if (error.code === 11000) return DuplicateError(res, error);
  if (err.name === 'ValidationError') return ValidationError(res, error);
  if (err.name === 'CastError') return CastError(res, error);
  if (error.name === 'JsonWebTokenError') return MalformError(res);
  if (error.name === 'TokenExpireError') return TokenExpireError(res, error);

  return _response(
    res,
    500,
    'something went very wrong, kindly try again, if error persist, contact support'
  );
}

// express global error handler takes 4 arguments
function globalErrorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'production') return HandleProdError(res, err);
  return _response(res, err.statusCode || 400, err.stack);
}

module.exports = globalErrorHandler;
