const AbstractController = require("./AbstractController");

const database = require("../../database");

class ItemController extends AbstractController {
  constructor() {
    super();

    this.router.get("/items", this.browse);
    this.router.get("/items/:id", this.read);
    this.router.put("/items/:id", this.edit);
    this.router.post("/items", this.add);
    this.router.delete("/items/:id", this.delete);
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
