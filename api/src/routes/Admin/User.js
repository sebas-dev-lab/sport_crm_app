const express = require("express");
const controller = require("../../controllers/Admin/User");
const route = express.Router();

route.post("/", controller.create_user);
route.get("/:code", controller.get_user_code);
route.get("/", controller.get_all_users);
route.get("/data", controller.get_user_data);
route.put("/:code", controller.update_user);
route.delete("/:code", controller.delete_user);

module.exports = route;
