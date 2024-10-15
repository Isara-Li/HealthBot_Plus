const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Adjust the port if necessary
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // You can access config and modify it if needed
      return config; // Return the modified config if you make changes
    },
  },
});
