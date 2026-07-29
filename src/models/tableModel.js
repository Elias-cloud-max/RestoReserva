const db = require("../config/database");

class Table {
  static getAll(callback) {
    const sql = `
      SELECT *
      FROM tables
      ORDER BY table_number ASC
    `;

    db.all(sql, [], callback);
  }

  static filter(filters, callback) {
    let sql = `
      SELECT *
      FROM tables
      WHERE 1 = 1
    `;

    const values = [];

    if (filters.status) {
      sql += `
        AND status = ?
      `;
      values.push(filters.status);
    }

    if (filters.location) {
      sql += `
        AND location = ?
      `;
      values.push(filters.location);
    }

  if (filters.capacity) {
  sql += `
    AND capacity >= ?
  `;
  values.push(filters.capacity);
}

    sql += `
      ORDER BY table_number ASC
    `;

    db.all(sql, values, callback);
  }

  static getById(id, callback) {
    const sql = `
      SELECT *
      FROM tables
      WHERE id = ?
    `;

    db.get(sql, [id], callback);
  }

  static create(table, callback) {
    const sql = `
      INSERT INTO tables (
        table_number,
        capacity,
        location,
        status,
        description
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      table.table_number,
      table.capacity,
      table.location,
      table.status,
      table.description || null
    ];

    db.run(sql, values, function (error) {
      if (error) {
        return callback(error);
      }

      callback(null, this.lastID);
    });
  }

  static update(id, table, callback) {
    const sql = `
      UPDATE tables
      SET
        table_number = ?,
        capacity = ?,
        location = ?,
        status = ?,
        description = ?
      WHERE id = ?
    `;

    const values = [
      table.table_number,
      table.capacity,
      table.location,
      table.status,
      table.description || null,
      id
    ];

    db.run(sql, values, function (error) {
      if (error) {
        return callback(error);
      }

      callback(null, this.changes);
    });
  }

  static delete(id, callback) {
    const sql = `
      DELETE FROM tables
      WHERE id = ?
    `;

    db.run(sql, [id], callback);
  }
}

module.exports = Table;