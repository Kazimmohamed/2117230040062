'use strict';

// Emits one centralized log entry for every completed HTTP request.
const { Log, STACKS } = require('logging_middleware');

function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', async function onFinish() {
    const durationMs = Date.now() - startedAt;
    const level = res.statusCode >= 400 ? 'error' : 'info';
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`;

    await Log(STACKS.BACKEND, level, 'request-middleware', message);
  });

  next();
}

module.exports = requestLogger;
