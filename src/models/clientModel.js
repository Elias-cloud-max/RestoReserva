const db = require("../config/database");

class Client {
  static getAll(callback) {
    const sql = `
      SELECT *
      FROM clients
      ORDER BY id DESC
    `;

    db.all(sql, [], callback);
  }

  static search(term, callback) {
  const sql = `
    SELECT *
    FROM clients
    WHERE
      first_name LIKE ?
      OR last_name LIKE ?
      OR phone LIKE ?
      OR email LIKE ?
    ORDER BY id DESC
  `;

  const value = `%${term}%`;

  db.all(sql, [value, value, value, value], callback);
}

  static getById(id, callback) {
    const sql = `
      SELECT *
      FROM clients
      WHERE id = ?
    `;

    db.get(sql, [id], callback);
  }

  static create(client, callback) {
    const sql = `
      INSERT INTO clients (
        first_name,
        last_name,
        phone,
        email,
        notes
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      client.first_name,
      client.last_name,
      client.phone,
      client.email || null,
      client.notes || null
    ];

    db.run(sql, values, function (error) {
      if (error) {
        return callback(error);
      }

      callback(null, this.lastID);
    });
  }

  static findDuplicate(phone, email, excludeId, callback) {
    const sql = `
      SELECT *
      FROM clients
      WHERE id != ?
        AND (
          phone = ?
          OR (
            ? IS NOT NULL
            AND email = ?
          )
        )
      LIMIT 1
    `;

    const values = [
      excludeId,
      phone,
      email || null,
      email || null
    ];

    db.get(sql, values, callback);
  }

  static update(id, client, callback) {
    const sql = `
      UPDATE clients
      SET
        first_name = ?,
        last_name = ?,
        phone = ?,
        email = ?,
        notes = ?
      WHERE id = ?
    `;

    const values = [
      client.first_name,
      client.last_name,
      client.phone,
      client.email || null,
      client.notes || null,
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
      DELETE FROM clients
      WHERE id = ?
    `;

    db.run(sql, [id], callback);
  }
}

module.exports = Client;