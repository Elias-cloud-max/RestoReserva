const db = require("./database");

function initializeDatabase() {
  const createClientsTable = `
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      email TEXT UNIQUE,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createTablesTable = `
    CREATE TABLE IF NOT EXISTS tables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_number INTEGER NOT NULL UNIQUE,
      capacity INTEGER NOT NULL,
      location TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Disponible',
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createReservationsTable = `
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      table_id INTEGER NOT NULL,
      reservation_date TEXT NOT NULL,
      reservation_time TEXT NOT NULL,
      people INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pendiente',
      special_requests TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (table_id) REFERENCES tables(id)
    )
  `;

  db.run(createClientsTable, (error) => {
    if (error) {
      console.error("Error al crear la tabla clients:", error.message);
      return;
    }

    console.log("Tabla clients lista.");
  });

  db.run(createTablesTable, (error) => {
    if (error) {
      console.error("Error al crear la tabla tables:", error.message);
      return;
    }

    console.log("Tabla tables lista.");
  });

  db.run(createReservationsTable, (error) => {
    if (error) {
      console.error(
        "Error al crear la tabla reservations:",
        error.message
      );
      return;
    }

    console.log("Tabla reservations lista.");
  });
}

module.exports = initializeDatabase;