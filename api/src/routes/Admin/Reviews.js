const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Reviews");

route.post("/", controller.post_review);
route.get("/:service", controller.get_all_reviews);
route.put("/", controller.put_review);
route.delete("/:code", controller.delete_review);

module.exports = route;
