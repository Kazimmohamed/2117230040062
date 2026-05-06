'use strict';

// Declares depot-related HTTP routes for external depot data access.
const express = require('express');

const depotController = require('../controllers/depotController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/api/depots', asyncHandler(depotController.getDepots));

module.exports = router;
