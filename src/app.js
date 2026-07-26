const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("RestoReserve funciona correctamente");
});

app.listen(PORT, () => {
  console.log(`RestoReserve ejecutándose en http://localhost:${PORT}`);
});
