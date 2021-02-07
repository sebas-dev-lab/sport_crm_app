// ??? Endpoint

const app = require("./server.js");
const mongoose = require("./db");
require("dotenv").config();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB connected");
});

// Starting Server

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
