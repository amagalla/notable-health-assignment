//  Node imports
const express = require("express"),
  fs = require("fs"),
  yml = require("yaml"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  dotenv = require("dotenv");

dotenv.config();

// swagger imports
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");

// swagger initialization
const swaggerFile = fs.readFileSync(
  "./app/lib/config/swaggerOptions.yml",
  "utf-8"
);
const options = yml.parse(swaggerFile);
const docs = swaggerDoc(options);

// Express server setup
const app = express(),
  PORT = process.env.SERVER_PORT || 3000;

// import Routes
const profiles = require("./routes/api/schedules");

// error handler
const { errorhandler } = require("./error-handling/error-handler");
// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// swagger doc route
app.use("/admin/swagger", swaggerUI.serve, swaggerUI.setup(docs));

// define routes
app.use("/api/schedules/", profiles);

app.use(errorhandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
