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

  browse = (request, response) => {
    database.item
      .findAll()
      .then(([rows]) => {
        response.send(rows);
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(500);
      });
  };

  read = (request, response) => {
    database.item
      .find(request.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          response.sendStatus(404);
        } else {
          response.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(500);
      });
  };

  edit = (request, response) => {
    const item = request.body;

    // TODO validations (length, format...)

    item.id = parseInt(request.params.id);

    database.item
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          response.sendStatus(404);
        } else {
          response.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(500);
      });
  };

  add = (request, response) => {
    const item = request.body;

    // TODO validations (length, format...)

    database.item
      .insert(item)
      .then(([result]) => {
        response.status(201).send({ ...item, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(500);
      });
  };

  delete = (request, response) => {
    database.item
      .delete(request.params.id)
      .then(() => {
        response.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        response.sendStatus(500);
      });
  };
}

module.exports = ItemController;
