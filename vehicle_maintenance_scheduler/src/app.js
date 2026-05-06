'use strict';

// Builds the Express application with middleware, routes, and centralized error handling.
const express = require('express');

const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
