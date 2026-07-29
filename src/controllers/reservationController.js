const Reservation = require("../models/reservationModel");
const Client = require("../models/clientModel");
const Table = require("../models/tableModel");

function getFormData(callback) {
  Client.getAll((clientError, clients) => {
    if (clientError) {
      return callback(clientError);
    }

    Table.getAll((tableError, tables) => {
      if (tableError) {
        return callback(tableError);
      }

      callback(null, {
        clients,
        tables
      });
    });
  });
}

function validateReservation(reservation, table, excludeId, callback) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reservationDate = new Date(
    `${reservation.reservation_date}T00:00:00`
  );

  if (reservationDate < today) {
    return callback("No se permiten reservas en fechas pasadas.");
  }

  if (reservation.people < 1) {
    return callback("La cantidad de personas debe ser mayor que cero.");
  }

  if (reservation.people > table.capacity) {
    return callback(
      `La mesa seleccionada tiene capacidad para ${table.capacity} personas.`
    );
  }

  Reservation.findConflict(
    reservation.table_id,
    reservation.reservation_date,
    reservation.reservation_time,
    excludeId,
    (error, conflict) => {
      if (error) {
        return callback(
          "No fue posible validar la disponibilidad de la mesa."
        );
      }

      if (conflict) {
        return callback(
          "La mesa ya tiene una reserva para esa fecha y hora."
        );
      }

      callback(null);
    }
  );
}

const reservationController = {
  index(req, res) {
  const filters = {
    search: req.query.search?.trim() || "",
    status: req.query.status?.trim() || "",
    date: req.query.date?.trim() || ""
  };

  const hasFilters =
    filters.search ||
    filters.status ||
    filters.date;

  const callback = (error, reservations) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener las reservas.");
    }

    res.render("reservations/index", {
      title: "Reservas",
      reservations,
      filters
    });
  };

  if (hasFilters) {
    Reservation.filter(filters, callback);
  } else {
    Reservation.getAll(callback);
  }
},

  newForm(req, res) {
    getFormData((error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error al cargar el formulario.");
      }

      res.render("reservations/new", {
        title: "Nueva reserva",
        error: null,
        reservation: {
          status: "Pendiente"
        },
        ...data
      });
    });
  },

  create(req, res) {
    const reservation = {
      client_id: Number(req.body.client_id),
      table_id: Number(req.body.table_id),
      reservation_date: req.body.reservation_date,
      reservation_time: req.body.reservation_time,
      people: Number(req.body.people),
      status: req.body.status,
      special_requests: req.body.special_requests?.trim()
    };

    getFormData((formError, data) => {
      if (formError) {
        return res.status(500).send("Error al cargar los datos.");
      }

      if (
        !reservation.client_id ||
        !reservation.table_id ||
        !reservation.reservation_date ||
        !reservation.reservation_time ||
        !reservation.people
      ) {
        return res.status(400).render("reservations/new", {
          title: "Nueva reserva",
          error: "Completa todos los campos obligatorios.",
          reservation,
          ...data
        });
      }

      const table = data.tables.find(
        item => item.id === reservation.table_id
      );

      if (!table) {
        return res.status(400).render("reservations/new", {
          title: "Nueva reserva",
          error: "La mesa seleccionada no existe.",
          reservation,
          ...data
        });
      }

      validateReservation(
        reservation,
        table,
        null,
        (validationError) => {
          if (validationError) {
            return res.status(400).render("reservations/new", {
              title: "Nueva reserva",
              error: validationError,
              reservation,
              ...data
            });
          }

          Reservation.create(reservation, (error) => {
            if (error) {
              console.error(error);

              return res.status(500).render("reservations/new", {
                title: "Nueva reserva",
                error: "No fue posible registrar la reserva.",
                reservation,
                ...data
              });
            }

            res.redirect("/reservations");
          });
        }
      );
    });
  },

  editForm(req, res) {
    Reservation.getById(req.params.id, (error, reservation) => {
      if (error) {
        return res.status(500).send("Error al consultar la reserva.");
      }

      if (!reservation) {
        return res.status(404).send("Reserva no encontrada.");
      }

      getFormData((formError, data) => {
        if (formError) {
          return res.status(500).send("Error al cargar el formulario.");
        }

        res.render("reservations/edit", {
          title: "Editar reserva",
          error: null,
          reservation,
          ...data
        });
      });
    });
  },

  update(req, res) {
    const id = req.params.id;

    const reservation = {
      client_id: Number(req.body.client_id),
      table_id: Number(req.body.table_id),
      reservation_date: req.body.reservation_date,
      reservation_time: req.body.reservation_time,
      people: Number(req.body.people),
      status: req.body.status,
      special_requests: req.body.special_requests?.trim()
    };

    getFormData((formError, data) => {
      if (formError) {
        return res.status(500).send("Error al cargar los datos.");
      }

      const table = data.tables.find(
        item => item.id === reservation.table_id
      );

      if (!table) {
        return res.status(400).render("reservations/edit", {
          title: "Editar reserva",
          error: "La mesa seleccionada no existe.",
          reservation: {
            id,
            ...reservation
          },
          ...data
        });
      }

      validateReservation(
        reservation,
        table,
        id,
        (validationError) => {
          if (validationError) {
            return res.status(400).render("reservations/edit", {
              title: "Editar reserva",
              error: validationError,
              reservation: {
                id,
                ...reservation
              },
              ...data
            });
          }

          Reservation.update(id, reservation, (error) => {
            if (error) {
              console.error(error);

              return res.status(500).render("reservations/edit", {
                title: "Editar reserva",
                error: "No fue posible actualizar la reserva.",
                reservation: {
                  id,
                  ...reservation
                },
                ...data
              });
            }

            res.redirect("/reservations");
          });
        }
      );
    });
  },

  delete(req, res) {
    Reservation.delete(req.params.id, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("No fue posible eliminar la reserva.");
      }

      res.redirect("/reservations");
    });
  }
};

module.exports = reservationController;