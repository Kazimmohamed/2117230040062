'use strict';

// Validates log input and sends it to the external logging API.
const apiClient = require('./apiClient');
const { STACKS, LEVELS, PACKAGES } = require('./constants');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateLogPayload(stack, level, packageName, message) {
  if (!STACKS.includes(stack)) {
    throw new Error('Invalid stack value');
  }

  if (!LEVELS.includes(level)) {
    throw new Error('Invalid level value');
  }

  if (!PACKAGES.includes(packageName)) {
    throw new Error('Invalid package value');
  }

  if (!isNonEmptyString(message)) {
    throw new Error('Invalid message value');
  }
}

async function Log(stack, level, packageName, message) {
  try {
    validateLogPayload(stack, level, packageName, message);

    const response = await apiClient.post('/logs', {
      stack: stack.trim(),
      level: level.trim(),
      package: packageName.trim(),
      message: message.trim(),
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      status: error.response ? error.response.status : 500,
    };
  }
}

module.exports = {
  Log,
};
