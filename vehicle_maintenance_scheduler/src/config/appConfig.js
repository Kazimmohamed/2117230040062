'use strict';

// Centralizes runtime configuration used by the Express application.
const appConfig = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
});

module.exports = appConfig;
