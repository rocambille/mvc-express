const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  static table = "item";

  async find(id) {
    const [rows] = await this.connection.execute(
      `select * from  ${ItemManager.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async findAll() {
    const [rows] = await this.connection.query(
      `select * from  ${ItemManager.table}`
    );

    return rows;
  }

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

  async delete(id) {
    await this.connection.execute(
      `delete from ${ItemManager.table} where id = ?`,
      [id]
    );
  }
}

module.exports = ItemManager;
