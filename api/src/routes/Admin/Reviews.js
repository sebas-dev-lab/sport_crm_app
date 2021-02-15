const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Reviews");

route.post("/", controller.post_review);

module.exports = route;
