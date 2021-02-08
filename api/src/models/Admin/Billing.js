const { Schema, model, connection } = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

const billingSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  date: {
    type: Date,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pay_method: {
    type: Schema.Types.ObjectId,
    ref: "Pay_Method",
  },
  iva: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  type_billing: {
    ENUM: ["A", "B", "C"],
    default: "B",
  },
  discount: {
    type: Number,
  },
});

billingSchema.plugin(require("mongoose-autopopulate"));
billingSchema.plugin(autoIncrement.plugin, {
  model: "Billing",
  field: "code",
  satartAt: 1,
  incrementBy: 1,
});

billingSchema.plugin(findOrCreate);
const Billing = model("Billing", billingSchema);

module.exports = Billing;
