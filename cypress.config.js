const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "65dg6c",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
