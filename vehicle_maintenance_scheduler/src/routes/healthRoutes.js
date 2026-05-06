'use strict';

// Declares health-related HTTP routes for the scheduler application.
const express = require('express');

const healthController = require('../controllers/healthController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/health', asyncHandler(healthController.getHealth));

module.exports = router;
