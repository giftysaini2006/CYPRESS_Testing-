// ***********************************************************
// cypress/support/e2e.js
// This file is processed and loaded automatically before test files.
// ***********************************************************

// Import custom commands
import './commands';

// Ignore uncaught exceptions caused by third-party scripts or ad networks on DemoQA
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing tests on third-party runtime errors
  return false;
});
