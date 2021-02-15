const express = require("express");
const controller = require("../../controllers/Admin/Contact");
const route = express.Router();

route.post("/", controller.post_contact);
route.get("/", controller.get_all_contact);
route.get("/name", controller.get_one_contact);
route.put("/", controller.put_contact);
route.delete("/:name", controller.delete_contact);

module.exports = route;
