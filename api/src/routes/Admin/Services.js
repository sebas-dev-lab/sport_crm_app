const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Service");

route.post("/", controller.post_service);
route.get("/", controller.get_all_services);
route.get("/:code", controller.get_service_code);
route.put("/", controller.put_service);
route.delete("/:code", controller.delete_service);

module.exports = route;
