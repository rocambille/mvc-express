require("dotenv").config();

const fs = require("fs");
const App = require("./src/App");

const controllers = fs
  .readdirSync("./src/controllers")
  .filter((file) => file !== "AbstractController.js")
  .map((file) => {
    const Controller = require("./src/controllers/" + file);
    return new Controller();
  });

const port = parseInt(process.env.APP_PORT ?? "5000");

const app = new App(controllers, port);

app.listen();
