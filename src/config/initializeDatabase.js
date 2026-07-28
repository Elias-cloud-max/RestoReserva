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

  db.run(createClientsTable, (error) => {
    if (error) {
      console.error("Error al crear la tabla clients:", error.message);
      return;
    }

    console.log("Tabla clients lista.");
  });
}

module.exports = initializeDatabase;