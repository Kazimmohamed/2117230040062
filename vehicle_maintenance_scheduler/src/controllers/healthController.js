'use strict';

// Coordinates the health route by calling the service layer and shaping the response.
const healthService = require('../services/healthService');

async function getHealth(req, res) {
  const payload = await healthService.getHealthStatus();

  return res.status(200).json(payload);
}

module.exports = {
  getHealth,
};
