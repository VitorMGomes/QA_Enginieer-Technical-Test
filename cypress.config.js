import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://www.automationpractice.pl/index.php?controller=authentication&back=my-account',
    testIsolation: false,
  },
});
