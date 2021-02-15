// Require Express
const express = require("express");
// Import Routes
const user_routes = require("./User");
const contact_routes = require("./Contact");
const service_routes = require("./Services");
const category_routes = require("./Category");
const review_routes = require("./Reviews");
// Require Router
const route = express.Router();

route.use("/user", user_routes);
route.use("/contact", contact_routes);
route.use("/service", service_routes);
route.use("/category", category_routes);
route.use("/reviews", review_routes);

module.exports = route;
