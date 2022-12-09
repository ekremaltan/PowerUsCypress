const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: "m97z2z",
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 40000,
  viewportHeight: 1028,
  viewportHeight: 1920,
  env: {
    baseURL: "https://staging.powerus.de/",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/integration/examples/BDD/*.feature",
    screenshotsFolder: "cypress/screenshots",
  },
});
