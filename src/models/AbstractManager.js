class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  find(id, callback) {
    this.connection.query(
      `select * from  ${this.table} where id = ?`,
      [id],
      (err, result) => callback(err, result ? result[0] : null)
    );
  }

  findAll(callback) {
    this.connection.query(`select * from  ${this.table}`, callback);
  }

  delete(id, callback) {
    this.connection.query(
      `delete from ${this.table} where id = ?`,
      [id],
      callback
    );
  }
}

module.exports = AbstractManager;
