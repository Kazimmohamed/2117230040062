'use strict';

// Aggregates application routes into a single router for app registration.
const express = require('express');

const healthRoutes = require('./healthRoutes');

const router = express.Router();

router.use(healthRoutes);

module.exports = router;
