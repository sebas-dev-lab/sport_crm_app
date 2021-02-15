const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
autoincrement.initialize(connection);
const findOrCreate = require("mongoose-findorcreate");

const serviceSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ranking: {
    type: Number,
    required: false,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Reviews",
  },
});

serviceSchema.plugin(require("mongoose-autopopulate"));
serviceSchema.plugin(autoincrement.plugin, {
  model: "Service",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

serviceSchema.plugin(findOrCreate);
const Service = model("Service", serviceSchema);

module.exports = Service;
