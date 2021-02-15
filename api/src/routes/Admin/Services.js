const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Service");

route.post("/", controller.post_service);

module.exports = route;
