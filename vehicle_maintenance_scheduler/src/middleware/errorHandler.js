'use strict';

// Converts application errors into consistent HTTP responses and logs failures.
const { Log, STACKS } = require('logging_middleware');

async function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = Number(err.statusCode) || 500;
  const message = err.message || 'Internal server error';

  await Log(
    STACKS.BACKEND,
    'error',
    'error-handler',
    `${req.method} ${req.originalUrl} ${statusCode} ${message}`
  );

  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
