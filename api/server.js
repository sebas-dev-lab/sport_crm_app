//???? Server config
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ad_routes = require("./src/routes/Admin/index");

// Server
const app = express();
app.set("port", process.env.PORT || 3001);

// Settings
app.use(cors());

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

// Routes
app.use("/", ad_routes);

module.exports = app;
