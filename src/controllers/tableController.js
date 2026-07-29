const Table = require("../models/tableModel");

const tableController = {
  index(req, res) {
  const filters = {
    status: req.query.status?.trim() || "",
    location: req.query.location?.trim() || "",
    capacity: Number(req.query.capacity) || ""
  };

  const hasFilters =
    filters.status ||
    filters.location ||
    filters.capacity;

  const callback = (error, tables) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener las mesas.");
    }

    res.render("tables/index", {
      title: "Mesas",
      tables,
      filters
    });
  };

  if (hasFilters) {
    Table.filter(filters, callback);
  } else {
    Table.getAll(callback);
  }
},

  newForm(req, res) {
    res.render("tables/new", {
      title: "Nueva mesa",
      error: null,
      table: {
        status: "Disponible"
      }
    });
  },

  create(req, res) {
    const table = {
      table_number: Number(req.body.table_number),
      capacity: Number(req.body.capacity),
      location: req.body.location?.trim(),
      status: req.body.status?.trim(),
      description: req.body.description?.trim()
    };

    if (
      !table.table_number ||
      !table.capacity ||
      !table.location ||
      !table.status
    ) {
      return res.status(400).render("tables/new", {
        title: "Nueva mesa",
        error: "Número, capacidad, ubicación y estado son obligatorios.",
        table
      });
    }

    if (table.table_number < 1) {
      return res.status(400).render("tables/new", {
        title: "Nueva mesa",
        error: "El número de mesa debe ser mayor que cero.",
        table
      });
    }

    if (table.capacity < 1) {
      return res.status(400).render("tables/new", {
        title: "Nueva mesa",
        error: "La capacidad debe ser mayor que cero.",
        table
      });
    }

    Table.create(table, (error) => {
      if (error) {
        console.error(error);

        let message = "No fue posible registrar la mesa.";

        if (error.message.includes("UNIQUE")) {
          message = "Ya existe una mesa con ese número.";
        }

        return res.status(400).render("tables/new", {
          title: "Nueva mesa",
          error: message,
          table
        });
      }

      res.redirect("/tables");
    });
  },

  editForm(req, res) {
    Table.getById(req.params.id, (error, table) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error al consultar la mesa.");
      }

      if (!table) {
        return res.status(404).send("Mesa no encontrada.");
      }

      res.render("tables/edit", {
        title: "Editar mesa",
        error: null,
        table
      });
    });
  },

  update(req, res) {
    const id = req.params.id;

    const table = {
      table_number: Number(req.body.table_number),
      capacity: Number(req.body.capacity),
      location: req.body.location?.trim(),
      status: req.body.status?.trim(),
      description: req.body.description?.trim()
    };

    if (
      !table.table_number ||
      !table.capacity ||
      !table.location ||
      !table.status
    ) {
      return res.status(400).render("tables/edit", {
        title: "Editar mesa",
        error: "Número, capacidad, ubicación y estado son obligatorios.",
        table: {
          id,
          ...table
        }
      });
    }

    if (table.table_number < 1 || table.capacity < 1) {
      return res.status(400).render("tables/edit", {
        title: "Editar mesa",
        error: "El número y la capacidad deben ser mayores que cero.",
        table: {
          id,
          ...table
        }
      });
    }

    Table.update(id, table, (error) => {
      if (error) {
        console.error(error);

        let message = "No fue posible actualizar la mesa.";

        if (error.message.includes("UNIQUE")) {
          message = "Ya existe otra mesa con ese número.";
        }

        return res.status(400).render("tables/edit", {
          title: "Editar mesa",
          error: message,
          table: {
            id,
            ...table
          }
        });
      }

      res.redirect("/tables");
    });
  },

  delete(req, res) {
    Table.delete(req.params.id, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("No fue posible eliminar la mesa.");
      }

      res.redirect("/tables");
    });
  }
};

module.exports = tableController;