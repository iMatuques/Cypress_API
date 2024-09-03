const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: "mongodb+srv://iMatuques:Matuques626@bookapi.v7w5y.mongodb.net/?retryWrites=true&w=majority&appName=BookAPI",
      database: "test",
      collection: "livros",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      // implement node event listeners here
      configurePlugin(on);
      return config;
    },
  },
});
