const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbMongoose = require("./database/config");
const app = express();
dbMongoose();

// rutas que usara
app.use(cors());
app.use(express.json());
app.use("/api", require("./routers/auth"));
app.use("/events", require("./routers/events"));

app.listen(process.env.PORT, () => {
  console.log("conectado");
});
