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
}

module.exports = initializeDatabase;