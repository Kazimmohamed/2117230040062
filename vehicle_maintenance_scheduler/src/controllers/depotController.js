'use strict';

// Handles depot requests by logging intake, delegating to the service layer, and shaping responses.
const { Log, STACKS } = require('logging_middleware');

const depotService = require('../services/depotService');

async function getDepots(req, res) {
  await Log(
    STACKS.BACKEND,
    'info',
    'depot-controller',
    `Depot fetch request received for ${req.method} ${req.originalUrl}`
  );

  const depots = await depotService.fetchDepots();

  return res.status(200).json({
    success: true,
    data: depots,
  });
}

module.exports = {
  getDepots,
};
