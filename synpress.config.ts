import { defineConfig } from "cypress";

export default defineConfig({
  userAgent: "synpress",
  retries: {
    runMode: 0,
    openMode: 0,
  },
  screenshotsFolder: "screenshots",
  videosFolder: "videos",
  video: true,
  chromeWebSecurity: true,
  viewportWidth: 1366,
  viewportHeight: 850,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 30000,
  requestTimeout: 30000,
  // component: {
  //   setupNodeEvents(on, config) {},
  //   specPattern: "./**/*spec.{js,jsx,ts,tsx}",
  // },
});
