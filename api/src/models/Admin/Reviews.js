const { Schema, model, connection } = require("mongoose");
var autoincrement = require("mongoose-auto-increment");
autoincrement.initialize(connection);
const findOrCreate = require("mongoose-findorcreate");

const reviewSchema = new Schema({
  code: {
    type: Number,
    default: 0,
    unique: true,
  },
  service: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

reviewSchema.plugin(require("mongoose-autopopulate"));
reviewSchema.plugin(autoincrement.plugin, {
  model: "Review",
  field: "code",
  startAt: 1,
  incrementBy: 1,
});

reviewSchema.plugin(findOrCreate);
const Review = model("Review", reviewSchema);

module.exports = Review;
