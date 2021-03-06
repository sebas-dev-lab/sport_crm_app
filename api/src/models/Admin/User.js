const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment"); //no modificar
autoIncrement.initialize(mongoose.connection);
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    ENUM: ["admin", "center"],
    default: "admin",
  },
  status: {
    type: Boolean,
  },
  dni: {
    type: Number,
    required: true,
  },
  cuil_cuit: {
    type: Number,
    required: true,
  },
  admin_name_center: {
    type: String,
    required: true,
  },
  last_name_admin: {
    type: String,
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    autopopulate: true,
  },
  location: {
    type: [Number],
    index: {
      type: "2dsphere",
      sparse: true,
    },
  },
});

userSchema.plugin(require("mongoose-autopopulate"));

userSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

userSchema.plugin(findOrCreate);
const User = model("User", userSchema);

module.exports = User;
