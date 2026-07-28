const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const initializeDatabase = require("./config/initializeDatabase");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Archivos públicos
app.use(express.static(path.join(__dirname, "../public")));

// Página principal
app.get("/", (req, res) => {
  res.render("dashboard/index", {
    title: "Panel principal"
  });
});

app.use("/clients", clientRoutes);

// Página 404
app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

initializeDatabase();

app.listen(PORT, () => {
  console.log(`RestoReserve ejecutándose en http://localhost:${PORT}`);
});
