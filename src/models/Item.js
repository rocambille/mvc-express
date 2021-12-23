class Item {
  static table = "item";

  constructor(connection) {
    this.connection = connection;
  }

  async find(id) {
    const [rows] = await this.connection.execute(
      `select * from  ${Item.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async findAll() {
    const [rows] = await this.connection.query(`select * from  ${Item.table}`);

    return rows;
  }

  async insert(item) {
    const [results] = await this.connection.execute(
      `insert into ${Item.table} (title) values (?)`,
      [item.title]
    );

    return results.insertId;
  }

  async update(item) {
    const [results] = await this.connection.execute(
      `update ${Item.table} set title = ? where id = ?`,
      [item.title, item.id]
    );

    return results.affectedRows === 1;
  }

  async delete(id) {
    await this.connection.execute(`delete from ${Item.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = Item;
