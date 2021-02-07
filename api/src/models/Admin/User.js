const { Schema, model } = require("mongooes");
const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment"); //no modificar
autoIncrement.initialize(mongoose.connection);

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
    ENUM: ["admin", "center"],
    default: "admin",
  },
  status: {
    type: Boolean,
  },
  dni_cuil_cuit: {
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
