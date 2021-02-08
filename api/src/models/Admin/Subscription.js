const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
autoincrement.initialize(connection);

const subscriptionSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  date: {
    type: Date,
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

userSchema.plugin(require("mongoose-autopopulate"));
userSchema.plugin(autoincrement.plugin, {
  model: "Subscription",
  field: "code",
  satartAt: 1,
  incrementBy: 1,
});

userSchema.plugin(findOrCreate);
const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
