'use strict';

// Handles schedule requests by logging intake and returning the optimized task plan.
const { Log, STACKS } = require('logging_middleware');

const schedulingService = require('../services/schedulingService');

async function createSchedule(req, res) {
  await Log(
    STACKS.BACKEND,
    'info',
    'scheduling-controller',
    `Scheduling request received for ${req.method} ${req.originalUrl}`
  );

  const schedule = await schedulingService.createOptimizedSchedule(req.body);

  return res.status(200).json(schedule);
}

module.exports = {
  createSchedule,
};
