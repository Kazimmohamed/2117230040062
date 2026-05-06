'use strict';

// Creates the shared axios client for the evaluation logging API.
const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'http://20.207.122.201/evaluation-service',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer BTCDqT',
  },
});

module.exports = apiClient;
