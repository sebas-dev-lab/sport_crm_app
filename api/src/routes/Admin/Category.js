const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Category");

route.post("/", controller.post_category);

module.exports = route;
