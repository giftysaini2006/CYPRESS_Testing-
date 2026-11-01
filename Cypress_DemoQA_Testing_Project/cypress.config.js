const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    blockHosts: [
      '*google-analytics.com*',
      '*googlesyndication.com*',
      '*doubleclick.net*',
      '*adnxs.com*',
      '*amazon-adsystem.com*'
    ],
    setupNodeEvents(on, config) {
      // Node event listeners can be configured here
      return config;
    },
  },
});
