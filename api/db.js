// ???? Database Config
const mongoose = require("mongoose");
require("dotenv").config();

const { DATABASE_ATLAS } = process.env;

mongoose.connect(DATABASE_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose;
