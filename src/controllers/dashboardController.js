const Dashboard = require("../models/dashboardModel");

const dashboardController = {
  index(req, res) {
    Dashboard.getSummary((summaryError, summary) => {
      if (summaryError) {
        console.error(summaryError);

        return res.status(500).send(
          "Error al cargar el resumen del sistema."
        );
      }

      Dashboard.getUpcomingReservations(
        (reservationsError, upcomingReservations) => {
          if (reservationsError) {
            console.error(reservationsError);

            return res.status(500).send(
              "Error al cargar las próximas reservas."
            );
          }

          res.render("dashboard/index", {
            title: "Panel principal",
            summary,
            upcomingReservations
          });
        }
      );
    });
  }
};

module.exports = dashboardController;