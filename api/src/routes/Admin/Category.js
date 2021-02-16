const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Category");

route.post("/", controller.post_category);
route.get("/", controller.get_all_cateogies);
route.get("/:code", controller.get_one_category);
route.put("/", controller.put_category);
route.delete("/:code", controller.delete_category);
module.exports = route;
