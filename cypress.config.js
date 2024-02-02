const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8s7jra',
  e2e: {
    viewportWidth: 1440,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
