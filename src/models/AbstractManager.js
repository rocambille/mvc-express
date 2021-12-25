class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  async find(id) {
    const [rows] = await this.connection.execute(
      `select * from  ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async findAll() {
    const [rows] = await this.connection.query(`select * from  ${this.table}`);

    return rows;
  }

  async delete(id) {
    await this.connection.execute(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = AbstractManager;
