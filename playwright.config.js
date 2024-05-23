// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  // @ts-ignore
  reporter: [
    ['allure-playwright'],
    ['html'],
],
 
  use: {
  browserName:'chromium',
  headless:false,
//   screenshot:'only-on-failure',
//  video:'retain-on-failure'
  },

  
});

