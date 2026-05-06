'use strict';

// Aggregates application routes into a single router for app registration.
const express = require('express');

const depotRoutes = require('./depotRoutes');
const healthRoutes = require('./healthRoutes');
const schedulingRoutes = require('./schedulingRoutes');

const router = express.Router();

router.use(depotRoutes);
router.use(healthRoutes);
router.use(schedulingRoutes);

module.exports = router;
