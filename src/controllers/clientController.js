const Client = require("../models/clientModel");

const clientController = {
index(req, res) {
  const search = req.query.search?.trim() || "";

  const callback = (error, clients) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al obtener los clientes.");
    }

    res.render("clients/index", {
      title: "Clientes",
      clients,
      search
    });
  };

  if (search) {
    Client.search(search, callback);
  } else {
    Client.getAll(callback);
  }
},


  newForm(req, res) {
    res.render("clients/new", {
      title: "Nuevo cliente",
      error: null,
      client: {}
    });
  },

  create(req, res) {
    const client = {
      first_name: req.body.first_name?.trim(),
      last_name: req.body.last_name?.trim(),
      phone: req.body.phone?.trim(),
      email: req.body.email?.trim() || null,
      notes: req.body.notes?.trim() || null
    };

    if (!client.first_name || !client.last_name || !client.phone) {
      return res.status(400).render("clients/new", {
        title: "Nuevo cliente",
        error: "Nombre, apellido y teléfono son obligatorios.",
        client
      });
    }

    Client.create(client, (error) => {
      if (error) {
        console.error(error);

        let message = "No fue posible registrar el cliente.";

        if (error.message.includes("UNIQUE")) {
          message = "El teléfono o correo ya está registrado.";
        }

        return res.status(400).render("clients/new", {
          title: "Nuevo cliente",
          error: message,
          client
        });
      }

      res.redirect("/clients");
    });
  },

  editForm(req, res) {
    Client.getById(req.params.id, (error, client) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error al consultar el cliente.");
      }

      if (!client) {
        return res.status(404).send("Cliente no encontrado.");
      }

      res.render("clients/edit", {
        title: "Editar cliente",
        error: null,
        client
      });
    });
  },

  update(req, res) {
  const id = req.params.id;

  console.log("ID DEL CLIENTE:", id);

  const client = {
    first_name: req.body.first_name?.trim(),
    last_name: req.body.last_name?.trim(),
    phone: req.body.phone?.trim(),
    email: req.body.email?.trim() || null,
    notes: req.body.notes?.trim() || null
  };

  console.log("DATOS RECIBIDOS:", client);

    if (!client.first_name || !client.last_name || !client.phone) {
      return res.status(400).render("clients/edit", {
        title: "Editar cliente",
        error: "Nombre, apellido y teléfono son obligatorios.",
        client: {
          id,
          ...client
        }
      });
    }

    Client.findDuplicate(
      client.phone,
      client.email,
      id,
      (duplicateError, duplicateClient) => {
        if (duplicateError) {
          console.error(duplicateError);

          return res
            .status(500)
            .send("Error al validar los datos del cliente.");
        }

        if (duplicateClient) {
          return res.status(400).render("clients/edit", {
            title: "Editar cliente",
            error: "El teléfono o correo pertenece a otro cliente.",
            client: {
              id,
              ...client
            }
          });
        }

        Client.update(id, client, (error) => {
          if (error) {
            console.error(error);

            return res.status(500).render("clients/edit", {
              title: "Editar cliente",
              error: "No fue posible actualizar el cliente.",
              client: {
                id,
                ...client
              }
            });
          }

          res.redirect("/clients");
        });
      }
    );
  },

  delete(req, res) {
    Client.delete(req.params.id, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send("No fue posible eliminar el cliente.");
      }

      res.redirect("/clients");
    });
  }
};

module.exports = clientController;