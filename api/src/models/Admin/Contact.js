const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const findOrCreate = require("mongoose-findorcreate");

const contactSchema = new Schema({
  code: {
    type: Number,
    defautl: 0,
    unique: true,
  },
  name_center: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_1: {
    type: Number,
    required: true,
  },
  phone_2: {
    type: Number,
  },
  email_1: {
    type: String,
    required: true,
  },
  email_2: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twiter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});

contactSchema.plugin(require("mongoose-autopopulate"));
contactSchema.plugin(autoIncrement.plugin, {
  model: "Contact",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

contactSchema.plugin(findOrCreate);
const Contact = model("Contact", contactSchema);

module.exports = Contact;
