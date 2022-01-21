const fs = require("fs");
const mysql = require("mysql2/promise");
const path = require("path");

const fillDatabase = async (database) => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  fs.readdirSync(path.join(__dirname, "src/models"))
    .filter((file) => file !== "AbstractManager.js")
    .forEach((file) => {
      const Manager = require(path.join(__dirname, "src/models", file));

      database[Manager.table] = new Manager(connection, Manager.table);
    });
};

const database = {};

try {
  fillDatabase(database);
} catch (err) {
  console.log(err);
}

module.exports = database;
