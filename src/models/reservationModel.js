const db = require("../config/database");

class Reservation {
  static getAll(callback) {
    const sql = `
      SELECT
        reservations.*,
        clients.first_name,
        clients.last_name,
        tables.table_number,
        tables.capacity
      FROM reservations
      INNER JOIN clients
        ON reservations.client_id = clients.id
      INNER JOIN tables
        ON reservations.table_id = tables.id
      ORDER BY
        reservation_date ASC,
        reservation_time ASC
    `;

    db.all(sql, [], callback);
  }

  static filter(filters, callback) {
    let sql = `
      SELECT
        reservations.*,
        clients.first_name,
        clients.last_name,
        tables.table_number,
        tables.capacity
      FROM reservations
      INNER JOIN clients
        ON reservations.client_id = clients.id
      INNER JOIN tables
        ON reservations.table_id = tables.id
      WHERE 1 = 1
    `;

    const values = [];

    if (filters.status) {
      sql += `
        AND reservations.status = ?
      `;

      values.push(filters.status);
    }

    if (filters.date) {
      sql += `
        AND reservations.reservation_date = ?
      `;

      values.push(filters.date);
    }

    if (filters.search) {
      sql += `
        AND (
          clients.first_name LIKE ?
          OR clients.last_name LIKE ?
          OR (
            clients.first_name || ' ' || clients.last_name
          ) LIKE ?
        )
      `;

      const searchValue = `%${filters.search}%`;

      values.push(
        searchValue,
        searchValue,
        searchValue
      );
    }

    sql += `
      ORDER BY
        reservations.reservation_date ASC,
        reservations.reservation_time ASC
    `;

    db.all(sql, values, callback);
  }

  static getById(id, callback) {
    const sql = `
      SELECT *
      FROM reservations
      WHERE id = ?
    `;

    db.get(sql, [id], callback);
  }

  static create(reservation, callback) {
    const sql = `
      INSERT INTO reservations (
        client_id,
        table_id,
        reservation_date,
        reservation_time,
        people,
        status,
        special_requests
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      reservation.client_id,
      reservation.table_id,
      reservation.reservation_date,
      reservation.reservation_time,
      reservation.people,
      reservation.status,
      reservation.special_requests || null
    ];

    db.run(sql, values, function (error) {
      if (error) {
        return callback(error);
      }

      callback(null, this.lastID);
    });
  }

  static update(id, reservation, callback) {
    const sql = `
      UPDATE reservations
      SET
        client_id = ?,
        table_id = ?,
        reservation_date = ?,
        reservation_time = ?,
        people = ?,
        status = ?,
        special_requests = ?
      WHERE id = ?
    `;

    const values = [
      reservation.client_id,
      reservation.table_id,
      reservation.reservation_date,
      reservation.reservation_time,
      reservation.people,
      reservation.status,
      reservation.special_requests || null,
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
      DELETE FROM reservations
      WHERE id = ?
    `;

    db.run(sql, [id], callback);
  }

  static findConflict(
    tableId,
    date,
    time,
    excludeId,
    callback
  ) {
    let sql = `
      SELECT *
      FROM reservations
      WHERE table_id = ?
        AND reservation_date = ?
        AND reservation_time = ?
        AND status NOT IN (
          'Cancelada',
          'Completada',
          'No asistió'
        )
    `;

    const values = [
      tableId,
      date,
      time
    ];

    if (excludeId) {
      sql += `
        AND id != ?
      `;

      values.push(excludeId);
    }

    sql += `
      LIMIT 1
    `;

    db.get(sql, values, callback);
  }
}

module.exports = Reservation;