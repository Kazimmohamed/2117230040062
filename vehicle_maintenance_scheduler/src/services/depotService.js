'use strict';

// Fetches depot data from the external evaluation API and validates the response shape.
const axios = require('axios');
const { Log, STACKS } = require('logging_middleware');

const externalServices = require('../config/externalServices');
const createHttpError = require('../utils/createHttpError');

function validateDepotResponse(data) {
  if (!Array.isArray(data)) {
    throw createHttpError(502, 'Invalid depot response received from external service');
  }
}

async function fetchDepots() {
  try {
    const response = await axios.get(externalServices.depotApiUrl, {
      timeout: 5000,
    });

    validateDepotResponse(response.data);

    await Log(
      STACKS.BACKEND,
      'info',
      'depot-service',
      `Successfully fetched ${response.data.length} depots from external API`
    );

    return response.data;
  } catch (error) {
    if (error.statusCode) {
      await Log(
        STACKS.BACKEND,
        'error',
        'depot-service',
        `Depot response validation failed: ${error.message}`
      );

      throw error;
    }

    const statusCode = error.response ? error.response.status : 502;
    const failureMessage = error.response
      ? `Depot API request failed with status ${error.response.status}`
      : `Depot API request failed: ${error.message}`;

    await Log(
      STACKS.BACKEND,
      'error',
      'depot-service',
      `External depot API failure: ${failureMessage}`
    );

    throw createHttpError(statusCode, 'Unable to fetch depots at this time');
  }
}

module.exports = {
  fetchDepots,
};
