'use strict';

// Provides service-layer responses for system health endpoints.
async function getHealthStatus() {
  return {
    success: true,
    message: 'Vehicle maintenance scheduler running',
  };
}

module.exports = {
  getHealthStatus,
};
