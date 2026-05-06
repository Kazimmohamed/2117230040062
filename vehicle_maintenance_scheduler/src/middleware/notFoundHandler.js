'use strict';

// Produces a controlled 404 error for unmatched routes before the error handler responds.
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;

  next(error);
}

module.exports = notFoundHandler;
