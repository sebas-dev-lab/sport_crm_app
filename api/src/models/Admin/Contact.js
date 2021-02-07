const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const contactSchema = new Schema({
  code: {
    type: Number,
    defautl: 0,
    unique: true,
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
    required: false,
  },
  email_1: {
    type: String,
    required: true,
  },
  email_2: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  twiter: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
});

contactSchema.plugin(required("mongoose-autopopulate"));
contactSchema.plugin(autoIncrement.plugin, {
  model: "Contact",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

userSchema.plugin(findOrCreate);
const Contact = model("Contact", userContact);

module.exports = Contact;
