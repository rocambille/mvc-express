const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  static table = "item";

  async insert(item) {
    const [results] = await this.connection.execute(
      `insert into ${ItemManager.table} (title) values (?)`,
      [item.title]
    );

    return results.insertId;
  }

  async update(item) {
    const [results] = await this.connection.execute(
      `update ${ItemManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );

    return results.affectedRows === 1;
  }
}

module.exports = ItemManager;
