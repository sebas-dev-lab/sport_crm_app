const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
autoincrement.initialize(connection);
const findOrCreate = require("mongoose-findorcreate");

const subscriptionSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  date: {
    type: String,
  },
  status: {
    type: Boolean,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  Service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  clinet_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

subscriptionSchema.plugin(require("mongoose-autopopulate"));
subscriptionSchema.plugin(autoincrement.plugin, {
  model: "Subscription",
  field: "code",
  satartAt: 1,
  incrementBy: 1,
});

subscriptionSchema.plugin(findOrCreate);
const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
