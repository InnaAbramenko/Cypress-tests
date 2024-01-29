const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8s7jra',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
