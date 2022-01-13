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

  browse = (req, res) => {
    database.item.findAll((err, items) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(items);
      }
    });
  };

  read = (req, res) => {
    const itemId = parseInt(req.params.id);

    database.item.find(itemId, (err, item) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else if (item == null) {
        res.sendStatus(404);
      } else {
        res.send(item);
      }
    });
  };

  edit = (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemPropsToUpdate = req.body;

    // TODO validations (length, format...)

    database.item.update(itemId, itemPropsToUpdate, (err, affectedRows) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
  };

  add = (req, res) => {
    const itemPropsToInsert = req.body;

    // TODO validations (length, format...)

    database.item.insert(itemPropsToInsert, (err, insertId) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const createdItem = { id: insertId, ...itemPropsToInsert };
        res.status(201).send(createdItem);
      }
    });
  };

  delete = (req, res) => {
    const itemId = parseInt(req.params.id);

    database.item.delete(itemId, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  };
}

module.exports = ItemController;
