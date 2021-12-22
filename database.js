const fs = require("fs");

const database = fs.readdirSync("./src/models").reduce((acc, file) => {
  const Model = require("./src/models/" + file);
  return { ...acc, [Model.table]: new Model() };
}, {});

module.exports = database;
