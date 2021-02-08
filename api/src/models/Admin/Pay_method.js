const { Schema, model, Connection } = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

const paySchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  pay_type: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
});

paySchema.plugin(require("mongoose-autopopulate"));
paySchema.plugin(autoIncrement.plugin, {
  model: "Pay_Method",
  field: "code",
  satartAt: 1,
  incrementBy: 1,
});
paySchema.plugin(findOrCreate);
const Pay_Method = model("Pay_Method", paySchema);

module.exports = Pay_Method;
