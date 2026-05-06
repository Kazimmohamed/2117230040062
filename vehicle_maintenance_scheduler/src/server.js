'use strict';

// Starts the HTTP server and forwards startup failures into the shared logger.
const http = require('http');

const app = require('./app');
const appConfig = require('./config/appConfig');
const { Log, STACKS } = require('logging_middleware');

const server = http.createServer(app);

server.listen(appConfig.port);

server.on('error', async function onError(error) {
  await Log(
    STACKS.BACKEND,
    'error',
    'server',
    `Server startup failure on port ${appConfig.port}: ${error.message}`
  );
});

module.exports = server;
