'use strict';

// Stores the only allowed values used by the logging middleware.
const STACKS = Object.freeze(['backend', 'frontend']);

const LEVELS = Object.freeze(['debug', 'info', 'warn', 'error', 'fatal']);

const PACKAGES = Object.freeze([
  'cache',
  'controller',
  'cron_job',
  'db',
  'domain',
  'handler',
  'repository',
  'route',
  'service',
  'auth',
  'config',
  'middleware',
  'utils',
]);

module.exports = {
  STACKS,
  LEVELS,
  PACKAGES,
};
