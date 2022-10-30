module.exports = class X extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    this.success = `${code}`.startsWith(4) ? false : 'error';
  }
};
