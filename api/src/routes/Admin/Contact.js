const express = require("express");
const controller = require("../../controllers/Admin/Contact");
const route = express.Router();

route.post("/", controller.post_contact);

module.exports = route;
