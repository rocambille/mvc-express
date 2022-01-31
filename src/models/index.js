const fs = require("fs");
const mysql = require("mysql2/promise");
const path = require("path");

const load = async (models) => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  fs.readdirSync(__dirname)
    .filter((file) => file !== "AbstractManager.js" && file !== "index.js")
    .forEach((file) => {
      const Manager = require(path.join(__dirname, file));

      models[Manager.table] = new Manager(connection, Manager.table);
    });
};

const models = {};

try {
  load(models);
} catch (err) {
  console.log(err);
}

const handler = {
  get: function (obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      const pascalize = (string) =>
        string.slice(0, 1).toUpperCase() + string.slice(1);
      throw new ReferenceError(
        `models.${prop} is not defined. Did you create ${pascalize(
          prop
        )}Manager.js?`
      );
    }
  },
};

module.exports = new Proxy(models, handler);
