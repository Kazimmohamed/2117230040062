'use strict';

// Configures the shared axios client for all logging API requests.
const axios = require('axios');

const { LOGGING_API_URL } = require('./constants');

const apiClient = axios.create({
  baseURL: LOGGING_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = apiClient;
