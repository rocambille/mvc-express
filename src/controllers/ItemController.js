const express = require("express");
const database = require("../../database");

class ItemController {
  path = "/items";
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.browse);
    this.router.get(this.path + "/:id", this.read);
    this.router.put(this.path + "/:id", this.edit);
    this.router.post(this.path, this.add);
    this.router.delete(this.path, this.delete);
  }

  browse = async (request, response) => {
    await database.item.findAll();

    response.send("browse");
  };

  read = async (request, response) => {
    response.send("read");
  };

  edit = async (request, response) => {
    response.send("edit");
  };

  add = async (request, response) => {
    response.send("add");
  };

  delete = async (request, response) => {
    response.send("delete");
  };
}

module.exports = ItemController;
