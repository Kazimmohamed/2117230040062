'use strict';

const { Log } = require('./src');

async function runTest() {
  const response = await Log(
    'backend',
    'info',
    'service',
    'testing logging middleware'
  );

  console.log(response);
}

runTest();
