'use strict';

// Validates log payloads and sends them to the external evaluation logging API.
const apiClient = require('./apiClient');
const { VALID_STACKS } = require('./constants');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function buildValidationError(message) {
  const error = new Error(message);
  error.name = 'LogValidationError';
  return error;
}

function validateLogPayload(stack, level, packageName, message) {
  if (!isNonEmptyString(stack)) {
    throw buildValidationError('stack must be a non-empty string');
  }

  if (!VALID_STACKS.includes(stack.trim())) {
    throw buildValidationError('stack must be either "backend" or "frontend"');
  }

  if (!isNonEmptyString(level)) {
    throw buildValidationError('level must be a non-empty string');
  }

  if (!isNonEmptyString(packageName)) {
    throw buildValidationError('packageName must be a non-empty string');
  }

  if (!isNonEmptyString(message)) {
    throw buildValidationError('message must be a non-empty string');
  }
}

async function Log(stack, level, packageName, message) {
  try {
    validateLogPayload(stack, level, packageName, message);

    const payload = {
      stack: stack.trim(),
      level: level.trim(),
      package: packageName.trim(),
      message: message.trim(),
    };

    const response = await apiClient.post('', payload);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    const statusCode = error.response ? error.response.status : null;
    const responseData = error.response ? error.response.data : null;

    return {
      success: false,
      statusCode,
      error: error.message,
      data: responseData,
    };
  }
}

module.exports = {
  Log,
};
