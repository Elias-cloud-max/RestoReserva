const db = require("../config/database");

class Dashboard {
  static getSummary(callback) {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM clients) AS total_clients,

        (SELECT COUNT(*) FROM tables) AS total_tables,

        (
          SELECT COUNT(*)
          FROM tables
          WHERE status = 'Disponible'
        ) AS available_tables,

        (
          SELECT COUNT(*)
          FROM reservations
          WHERE reservation_date = DATE('now', 'localtime')
        ) AS today_reservations,

        (
          SELECT COUNT(*)
          FROM reservations
          WHERE status = 'Pendiente'
        ) AS pending_reservations,

        (
          SELECT COUNT(*)
          FROM reservations
          WHERE status = 'Confirmada'
        ) AS confirmed_reservations
    `;

    db.get(sql, [], callback);
  }

  static getUpcomingReservations(callback) {
    const sql = `
      SELECT
        reservations.id,
        reservations.reservation_date,
        reservations.reservation_time,
        reservations.people,
        reservations.status,

        clients.first_name,
        clients.last_name,

        tables.table_number

      FROM reservations

      INNER JOIN clients
        ON reservations.client_id = clients.id

      INNER JOIN tables
        ON reservations.table_id = tables.id

      WHERE
        reservations.reservation_date >= DATE('now', 'localtime')
        AND reservations.status NOT IN (
          'Cancelada',
          'Completada',
          'No asistió'
        )

      ORDER BY
        reservations.reservation_date ASC,
        reservations.reservation_time ASC

      LIMIT 5
    `;

    db.all(sql, [], callback);
  }
}

module.exports = Dashboard;