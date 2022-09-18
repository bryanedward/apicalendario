const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./bryanedward-apicalendar-1.0.0-swagger.json");
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.listen(process.env.PORT, () => {
  console.log("conectado");
});
