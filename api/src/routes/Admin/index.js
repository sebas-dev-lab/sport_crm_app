// Require Express
const express = require("express");
// Import Routes
const user_routes = require("./User");
const contact_routes = require("./Contact");

// Require Router
const route = express.Router();

route.use("/user", user_routes);
route.use("/contact", contact_routes);

module.exports = route;
