const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  static table = "item";

  insert(itemPropsToInsert, callback) {
    this.connection.query(
      `insert into ${ItemManager.table} (title) values (?)`,
      [itemPropsToInsert.title],
      (err, result) => callback(err, result?.insertId)
    );
  }

  update(id, itemPropsToUpdate, callback) {
    this.connection.query(
      `update ${ItemManager.table} set ? where id = ?`,
      [itemPropsToUpdate, id],
      (err, result) => callback(err, result?.affectedRows)
    );
  }
}

module.exports = ItemManager;
