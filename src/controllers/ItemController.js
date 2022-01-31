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
    database.item
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  read = (req, res) => {
    database.item
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  edit = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    item.id = parseInt(req.params.id);

    database.item
      .update(item)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  add = (req, res) => {
    const item = req.body;

    // TODO validations (length, format...)

    database.item
      .insert(item)
      .then(([result]) => {
        res.status(201).send({ ...item, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  delete = (req, res) => {
    database.item
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ItemController;
