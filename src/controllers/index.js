/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-shadow */
const fs = require("fs");
const path = require("path");

const controllers = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .reduce((controllers, file) => {
    const camelize = (string) =>
      string.slice(0, 1).toLowerCase() + string.slice(1);

    const key = camelize(file.slice(0, -"Controller.js".length));

    const Controller = require(path.join(__dirname, file));

    return { ...controllers, [key]: new Controller() };
  }, {});

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }
    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);
    throw new ReferenceError(
      `controllers.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Controller.js?`
    );
  },
};

module.exports = new Proxy(controllers, handler);
