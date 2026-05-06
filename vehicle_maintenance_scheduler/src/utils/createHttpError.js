'use strict';

// Creates consistent Error objects with attached HTTP status codes for middleware handling.
function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
}

module.exports = createHttpError;
