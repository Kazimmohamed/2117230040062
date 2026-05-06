'use strict';

// Declares scheduling routes for optimized vehicle maintenance task selection.
const express = require('express');

const schedulingController = require('../controllers/schedulingController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/api/schedule', asyncHandler(schedulingController.createSchedule));

module.exports = router;
