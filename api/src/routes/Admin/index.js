// Require Express
const express = require("express");
// Import Routes
const user_routes = require("./User");

// Require Router
const route = express.Router();

route.use("/user", user_routes);

module.exports = route;
