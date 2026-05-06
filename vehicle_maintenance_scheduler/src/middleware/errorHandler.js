'use strict';

// Logs request failures and returns a small standard JSON error response.
const { Log, STACKS } = require('logging_middleware');

async function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  await Log(
    STACKS.BACKEND,
    'error',
    'error-handler',
    `${req.method} ${req.originalUrl} ${statusCode} ${message}`
  );

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
}

module.exports = errorHandler;
