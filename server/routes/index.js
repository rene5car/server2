const express = require("express");
const app = express();

app.use("/usuario", require("./usuario"));
app.use("/puesto", require("./puesto"));
app.use("/empresa", require("./empresa"));
app.use("/correo", require("./correo"));

module.exports = app;