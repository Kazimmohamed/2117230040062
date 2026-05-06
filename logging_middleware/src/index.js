'use strict';

// Exposes the reusable logger module through a single import entry point.
const { Log } = require('./logger');
const { STACKS, VALID_STACKS } = require('./constants');

module.exports = {
  Log,
  STACKS,
  VALID_STACKS,
};
