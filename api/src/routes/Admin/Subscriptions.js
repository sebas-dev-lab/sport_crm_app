const express = require("express");
const route = express.Router();
const controller = require("../../controllers/Admin/Subscription");

route.post("/", controller.post_suscription);
route.get("/", controller.get_suscriptions);
route.get("/:code", controller.get_one_suscription);
route.put("/:code", controller.put_suscription);
route.delete("/:code", controller.delete_suscription);

module.exports = route;
