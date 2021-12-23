const fs = require("fs");
const mysql = require("mysql2/promise");

const fillDatabase = async (database) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  return fs
    .readdirSync("./src/models")
    .filter((file) => file !== "AbstractManager.js")
    .forEach((file) => {
      const Model = require("./src/models/" + file);

      database[Model.table] = new Model(connection);
    });
};

const database = {};

try {
  fillDatabase(database);
} catch (err) {
  console.log(err);
}

module.exports = database;
