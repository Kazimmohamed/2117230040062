'use strict';

// Validates scheduling input and delegates optimal task selection to the knapsack algorithm.
const { Log, STACKS } = require('logging_middleware');

const { optimizeTaskSchedule } = require('../algorithms/knapsackScheduler');
const createHttpError = require('../utils/createHttpError');

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

async function logValidationError(message) {
  await Log(STACKS.BACKEND, 'error', 'scheduling-service', `Validation error: ${message}`);
}

async function validateScheduleRequest(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    const message = 'Request body must be a valid JSON object';
    await logValidationError(message);
    throw createHttpError(400, message);
  }

  if (!isNonNegativeInteger(payload.mechanicHours)) {
    const message = 'mechanicHours must be a non-negative integer';
    await logValidationError(message);
    throw createHttpError(400, message);
  }

  if (!Array.isArray(payload.tasks) || payload.tasks.length === 0) {
    const message = 'tasks must be a non-empty array';
    await logValidationError(message);
    throw createHttpError(400, message);
  }

  const seenTaskIds = new Set();

  for (const task of payload.tasks) {
    if (!task || typeof task !== 'object' || Array.isArray(task)) {
      const message = 'Each task must be a valid object';
      await logValidationError(message);
      throw createHttpError(400, message);
    }

    if (!Object.prototype.hasOwnProperty.call(task, 'id')) {
      const message = 'Each task must include an id';
      await logValidationError(message);
      throw createHttpError(400, message);
    }

    if (seenTaskIds.has(task.id)) {
      const message = `Task ids must be unique. Duplicate id: ${task.id}`;
      await logValidationError(message);
      throw createHttpError(400, message);
    }

    seenTaskIds.add(task.id);

    if (!isPositiveInteger(task.duration)) {
      const message = `Task ${task.id} duration must be a positive integer`;
      await logValidationError(message);
      throw createHttpError(400, message);
    }

    if (!isNonNegativeInteger(task.score)) {
      const message = `Task ${task.id} score must be a non-negative integer`;
      await logValidationError(message);
      throw createHttpError(400, message);
    }
  }
}

async function createOptimizedSchedule(payload) {
  await validateScheduleRequest(payload);

  const schedule = optimizeTaskSchedule(payload.mechanicHours, payload.tasks);

  await Log(
    STACKS.BACKEND,
    'info',
    'scheduling-service',
    `Generated schedule with ${schedule.selectedTasks.length} selected tasks, totalScore=${schedule.totalScore}, totalHours=${schedule.totalHours}`
  );

  return schedule;
}

module.exports = {
  createOptimizedSchedule,
};
