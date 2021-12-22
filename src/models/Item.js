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
}

module.exports = Item;
