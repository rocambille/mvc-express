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
    this.router.delete(this.path + "/:id", this.delete);
  }

  browse = async (request, response) => {
    const items = await database.item.findAll();

    response.send(items);
  };

  read = async (request, response) => {
    const item = await database.item.find(request.params.id);

    if (item == null) {
      response.sendStatus(404);
    } else {
      response.send(item);
    }
  };

  edit = async (request, response) => {
    const item = request.body;

    // TODO validations (length, format...)

    item.id = request.params.id;

    const success = await database.item.update(item);

    if (success) {
      response.send(item);
    } else {
      response.sendStatus(500);
    }
  };

  add = async (request, response) => {
    const item = request.body;

    // TODO validations (length, format...)

    const id = await database.item.insert(item);

    response.send({ ...item, id });
  };

  delete = async (request, response) => {
    await database.item.delete(request.params.id);

    response.sendStatus(204);
  };
}

module.exports = ItemController;
