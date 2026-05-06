'use strict';

// Centralizes immutable values used by the logging module.
const LOGGING_API_URL = 'http://20.207.122.201/evaluation-service/logs';

const STACKS = Object.freeze({
  BACKEND: 'backend',
  FRONTEND: 'frontend',
});

const VALID_STACKS = Object.freeze(Object.values(STACKS));

module.exports = {
  LOGGING_API_URL,
  STACKS,
  VALID_STACKS,
};
