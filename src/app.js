const express = require("express");
const fs = require("fs");
const path = require("path");

// let's create express app

const app = express();

// add your application-level middlewares in the list below

const middlewares = [
  express.json(),
  express.static(path.join(__dirname, "..", "public")),
];

for (const middleware of middlewares) {
  app.use(middleware);
}

// controllers are created from the files in /src/controllers

const controllers = fs
  .readdirSync(path.join(__dirname, "controllers"))
  .filter((file) => file !== "AbstractController.js" && file !== "index.js")
  .map((file) => {
    const Controller = require(path.join(__dirname, "controllers", file));

    return new Controller();
  });

for (const controller of controllers) {
  app.use("/", controller.router);
}

// ready to export

module.exports = app;
